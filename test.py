from pymongo import MongoClient
import pymongo


client = MongoClient("mongodb+srv://Richinbk:RichinbkAuth123@users.mhqvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.Users
profiles = db.profiles


print(profiles.find_one({ "email": "Richinbk1@gmail.com"}))