from os import abort
import os
from flask import Flask, json, request, session
from flask_cors import CORS
from flask_login import LoginManager, current_user, login_manager, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
from pymongo import MongoClient
from db_functions import *
from user import User

app = Flask(__name__)
CORS(app)

app.secret_key = "SECRET"

GOOGLE_CLIENT_ID = os.environ.get("1097732373698-72rm00sovc1v5fhga05p9s2cc8tvbrru.apps.googleusercontent.com", None)
GOOGLE_CLIENT_SECRET = os.environ.get("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", None)
GOOGLE_DISCOVERY_URL = ("https://accounts.google.com/o/oauth2/auth")

login_manager = LoginManager()
login_manager.init_app(app)

client = WebApplicationClient(GOOGLE_CLIENT_ID)

try:
    client = MongoClient("mongodb+srv://Richinbk:RichinbkAuth123@users.mhqvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client.Users
    profiles = db.profiles
except:
    print("Failed to connect to database")


'''
def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in sessions:
            abort(401)
        else:
            return function()
    return wrapper
'''


@app.route("/register", methods=["POST"])
def register():
    x = {
        'email': request.form['email'],
        'password': request.form['password'],
        'profile_pic': ''
    }
    if(User.create(x) == True):
        return 'Registered'
    else:
        return 'User Exists'

@app.route("/register_google", methods=['POST'])
def google_register():
    
    x = {
        'email': request.json['email'],
        'profile_pic': request.json['imageUrl'],
        'google_id': request.json['googleId']
    }
    if(User.create(x) == True):
        return "User Created"
    else:
        return 'User Exists'
    
@app.route("/profile")
def profile():
    return "Protected Route"

@app.route("/login", methods=['GET','POST'])
def login():
    x = {
        'email': request.form['email'],
        'password': request.form['password']
    }

    if(User.get_from_db(x) == False):
        return("Incorrect Username Or Password")
    else:
        return json.loads(find_user(x))

@app.route("/google-login", methods=["POST"])
def google_login():

    x = {
        'email': request.json['email'],
        'google_id': request.json['googleId'] 
    }
 
    if(User.google_login(x) == False):
        return "Account doesn't exist"
    else:
        session['id'] = x['google_id']
        return "Exists"


@app.route("/check-login", methods=['POST'])
def check_login():
    
    check_id = request.json['loginId']

    if(session['id'] == check_id):
        return 'Authenticated'
    else:
        return 'Not Authenticated'

    






if __name__ == "__main__":
    app.run(debug=True, ssl_context="adhoc")