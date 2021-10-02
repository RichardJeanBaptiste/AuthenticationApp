from pymongo import MongoClient
import pymongo


client = MongoClient("mongodb+srv://Richinbk:RichinbkAuth123@users.mhqvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.Users
profiles = db.profiles


def register_new_user(data):
    profiles.insert_one(data)
