from pymongo import MongoClient
from bson import json_util
import pymongo


client = MongoClient("mongodb+srv://Richinbk:RichinbkAuth123@users.mhqvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.Users
profiles = db.profiles


def register_new_user(data):
    profiles.insert_one(data)

def find_user(data):
    print(data['email'])
    checkPass = data['password']
    a = profiles.find_one({'email': data['email']})
    if(a['password'] != checkPass):
        return(False)
    else:
        return(json_util.dumps(a))
    

