from flask import Flask, request
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

if __name__ == "__main__":
    app.run()