from flask import Flask,jsonify
from flask_cors import CORS

from flask_restful import Api
from flask_jwt_extended import JWTManager

from model import User,db
import resources

app = Flask(__name__)
CORS(app)
api = Api(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)

@app.route('/')
def index():
    return jsonify({"message" : "hello, this is server :)"})

api.add_resource(resources.UserRegistration, '/register')
api.add_resource(resources.All_workplace,'/allworkspace')
api.add_resource(resources.Session_data,'/Sessiondata')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.Workplace,'/workspace')

if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)
"""
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/proto"
mongo = PyMongo(app)

@app.route('/register', methods=['POST'])
def signin():
    print(request)
    try:
        user_data = request.json
        print(user_data)
        #users = mongo.db.users
        #users.insert_one(user_data)
        return jsonify({"message": "User signed in successfully!"})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)"""
"""from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Sample data (replace with your actual data retrieval logic)
sample_data = [
    {'id': 1, 'title': 'Tile 1', 'content': 'Content 1'},
    {'id': 2, 'title': 'Tile 2', 'content': 'Content 2'},
    {'id': 3, 'title': 'Tile 3', 'content': 'Content 3'},
]

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(sample_data)

@app.route('/tile', methods=['POST'])
def handle_tile_selection():
    selected_tile_id = request.json['tileId']
    # Perform actions based on the selected tile ID
    return jsonify({'message': f'Tile {selected_tile_id} selected'})

if __name__ == '__main__':
    app.run(debug=True)"""

