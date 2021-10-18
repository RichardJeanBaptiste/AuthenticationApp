import random
import os
from flask import Flask, request, session, redirect
from flask.helpers import url_for
from flask_cors import CORS
from flask_login import LoginManager, login_manager
from oauthlib.oauth2 import WebApplicationClient
from pymongo import MongoClient
from werkzeug.utils import redirect
from db_functions import *
from user import User

app = Flask(__name__, static_folder='./build', static_url_path='/',)
#CORS(app)

app.secret_key = "ajs76agwgfa7fha6fg7a6f671ga7"

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


@app.route("/", defaults={'path':''})
def serve(path):
    return app.send_static_file('index.html')


@app.route("/register", methods=["POST"])
def register():

    x = {
        'user_id': str(random.randrange(1, 10**11)),
        'email': request.form['email'],
        'password': request.form['password'],
        'profile_pic': '',
        'name': '',
        'bio': '',
        'phone': ''
    }
    if(User.create(x) == True):
        return redirect('https://richinbkauthapp.herokuapp.com/login')
    else:
        return 'User Exists'

@app.route("/userlogin", methods=['GET','POST'])
def login():
    x = {
        'email': request.form['email'].lower(),
        'password': request.form['password'].lower()
    }

    if(User.get_from_db(x) == None):
        return("Incorrect Username Or Password")
    else:
        userId = User.get_from_db(x)
        session['id'] = userId
        return redirect("https://richinbkauthapp.herokuapp.com/profile/" + userId)

@app.route("/register_google", methods=['POST'])
def google_register():

    
    x = {
        'user_id': request.json['googleId'],
        'email': request.json['email'],
        'profile_pic': request.json['imageUrl'],
        'name': '',
        'bio': '',
        'phone': '',
        'password': '*',
    }
    if(User.create(x) == True):
        return "User Created"
    else:
        return 'User Exists'
    

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

@app.route("/get_user", methods=["GET", "POST"])
def get_user():

    UserId = request.json['userid']
    Current_Search = User.get_user_info(UserId)

    x = {
        'user_id': Current_Search['user_id'],
        'email': Current_Search['email'],
        'profile_pic': Current_Search['profile_pic'],
        'name': Current_Search['name'],
        'bio': Current_Search['bio'],
        'phone': Current_Search['phone']
    }

    return x

@app.route("/edit_user", methods=["POST"])
def edit_user():
    User.edit_user(request.json['user_id'], request.json)
    return 'abcd'

@app.route("/logout", methods=['GET','POST'])
def logout_user():
    session.pop('id', None)
    return redirect("https://richinbkauthapp.herokuapp.com/login")
    
    

'''
if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=False, port=os.environ.get('PORT',80))
'''