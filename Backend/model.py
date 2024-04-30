from flask import Flask
from datetime import datetime
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'proto',
    'host': 'mongodb://localhost:27017/proto'
}
db = MongoEngine(app)

class User(db.Document):
    username = db.StringField()
    email = db.StringField()
    password = db.StringField()

class Session(db.Document):
    access_token = db.StringField(required=True)
    time = db.DateTimeField(default=datetime.now)
    platform = db.StringField()
    hashtag = db.StringField()
    start_time = db.StringField()
    end_time = db.StringField()
    data_dict = db.DictField()
    state = db.IntField(default=0)

class AnalysisedData(db.Document):
    access_token = db.StringField(required=True)
    time = db.DateTimeField(default=datetime.now)
    hashtag = db.StringField()
    data_dict = db.DictField()





