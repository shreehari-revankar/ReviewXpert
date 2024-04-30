import json
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from mongoengine import Q
from Scrappertweet2 import Person
import datetime
from Distributed import Distrubuted
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required,get_jwt_identity)
import hashlib
from model import User,Session,AnalysisedData, db

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('email')
parser.add_argument('password', help = 'Password cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        #try:
            data = parser.parse_args()
            #print(data)
            #print(hashlib.md5(data['password'].encode()).hexdigest())
            #print(data['username'])
            #temp = User.objects(User.username == data['username']).first()
            #print(temp['username'])
            if User.objects(email=data['email']).first():
                return {"error" : "User already exists try another Email"}

            u = User(username=data['username'],email=data['email'], password=hashlib.md5(data['password'].encode()).hexdigest())
            u.save()

            access_token = create_access_token(identity=data['email'])
            refresh_token = create_refresh_token(identity=data['email'])
            return {
                'email': data['email'],
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        #except:
         #   raise Exception()

class UserLogin(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            current_user = User.objects(email=data['email']).first()

            if not current_user:
                return {"error":"User not in DB. Register as a new user"}

            password = hashlib.md5(data['password'].encode()).hexdigest()
            if current_user.password == password :
                access_token = create_access_token(identity=data['email'])
                refresh_token = create_refresh_token(identity=data['email'])
                return {
                    'email': data['email'],
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            else:
                return {'error': 'Wrong credentials'}
        except:
            raise Exception("Cannot login user")

class Workplace(Resource):
    def post(self):
        try:
            data = request.get_json()
            #print(data)
            self.store_data(access_token=data.get('access_token'),platform=data.get('option'),hashtag= data.get('hash'),start_time= data.get('start'),end_time= data.get('end'),data_dict= json.loads(data.get('body')))
            return {'error': 'Successfull'}

        except:
            raise Exception("Cannot login user")

    def store_data(self,access_token,platform, hashtag, start_time, end_time, data_dict):
        my_data = Session(
            access_token=access_token,
            platform = platform,
            hashtag=hashtag,
            start_time=start_time,
            end_time=end_time,
            data_dict=data_dict
        )
        my_data.save()

class All_workplace(Resource):
    def post(self):
        try:
            data = request.get_json()
            #print(data)
            access_token = data.get('access_token')
            all_session = Session.objects(access_token=access_token).all()
            json_data = json.loads(all_session.to_json())
            return jsonify(json_data)
        except:
            raise Exception("Cannot login user")



class Session_data(Resource):
    def post(self):
        try:
            data = request.get_json()
            #print(data)
            access_token = data.get('access_token')
            hashtag = data.get('hashtag')
            time = data.get('time')
            time = time.get('$date')
            timestamp_ms = time

            # Convert milliseconds to seconds
            timestamp_s = timestamp_ms / 1000

            # Convert timestamp to datetime (UTC)
            dt = datetime.datetime.utcfromtimestamp(timestamp_s)

            print(time)
            state = Session.objects(Q(access_token=access_token) & Q(hashtag=hashtag) & Q(time=dt)).first()
            print(state.state)
            if state.state==0:
                dataload = []
                for i in range(1, 4):
                    x = Person(i, 3, state.hashtag, state.start_time, state.end_time, state.data_dict)
                    dataload.append(x)
                concept = state.data_dict.keys()
                Dist = Distrubuted(state.platform,dataload,concept)
                state.state = 1
                state.save()
                res = Dist.Spark_start()
                result = AnalysisedData(access_token=access_token,hashtag=hashtag,time=dt,data_dict=res)
                result.save()
                state.state = 2
                state.save()
                all_session = AnalysisedData.objects(
                    Q(access_token=access_token) & Q(hashtag=hashtag) & Q(time=dt)).all()
                if all_session:
                    # Assuming 'data_dict' is a field in the model
                    # Extract the 'data_dict' from the first session (you can adjust this based on your use case)
                    session_data_dict = all_session[0].data_dict
                    # print(session_data_dict)

                    # Convert the data_dict to a Python dictionary
                    try:
                        session_data_dict = dict(session_data_dict)
                        # print(session_data_dict)
                        json_data = json.dumps(session_data_dict)
                        # print(json_data)
                        print("Successfully loaded JSON data from data_dict.")
                        # Now you can work with the json_data dictionary
                        # ...
                    except json.JSONDecodeError:
                        print("Error: Unable to load JSON data from data_dict.")
                else:
                    print("No sessions found for the given criteria.")
                return jsonify(json_data)
            if state.state==1:
                res = {"data":"wait the system is working"}
                json_data = json.loads(res)
                return jsonify(json_data)
            if state.state==2:
                all_session = AnalysisedData.objects(Q(access_token=access_token) & Q(hashtag=hashtag) & Q(time=dt)).all()
                if all_session:
                    # Assuming 'data_dict' is a field in the model
                    # Extract the 'data_dict' from the first session (you can adjust this based on your use case)
                    session_data_dict = all_session[0].data_dict
                    #print(session_data_dict)

                    # Convert the data_dict to a Python dictionary
                    try:
                        session_data_dict=dict(session_data_dict)
                        #print(session_data_dict)
                        json_data = json.dumps(session_data_dict)
                        #print(json_data)
                        print("Successfully loaded JSON data from data_dict.")
                        # Now you can work with the json_data dictionary
                        # ...
                    except json.JSONDecodeError:
                        print("Error: Unable to load JSON data from data_dict.")
                else:
                    print("No sessions found for the given criteria.")
            return json_data
        except:
            raise Exception("Cannot login user")


