from flask import Flask, json, request
from pymongo import MongoClient
from db_functions import *

app = Flask(__name__)

client = MongoClient("mongodb+srv://Richinbk:RichinbkAuth123@users.mhqvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.Users
profiles = db.profiles



@app.route("/")
def hello():
    return "Hello World!"

@app.route("/register", methods=["POST"])
def register():
    x = {
        'email': request.form['email'],
        'password': request.form['password']
    }
    register_new_user(x)
    return "Registered"

@app.route("/login", methods=['GET','POST'])
def login():
    x = {
        'email': request.form['email'],
        'password': request.form['password']
    }

    if(find_user(x) == False):
        return("Incorrect Username Or Password")
    else:
        #return "abc"
        return json.loads(find_user(x))

    
    return find_user(x)

if __name__ == "__main__":
    app.run()