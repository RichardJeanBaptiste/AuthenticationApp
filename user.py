from flask_login import UserMixin
from pymongo import MongoClient
from bson import json_util

try:
    client = MongoClient("mongodb+srv://Richinbk:RichinbkAuth123@users.mhqvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client.Users
    profiles = db.profiles
    googleProfiles = db.google_profiles
except:
    print("Failed to connect to database")


class User(UserMixin):
    def __init__(self, id_, name, email, profile_pic):
        self.id = id_
        self.name = name
        self.email = email
        self.profile_pic = profile_pic
    
   
    @staticmethod
    def get_from_db(data):
        checkPass = data['password']
        a = profiles.find_one({'email': data['email']})
        try:
            if(a['password'] != checkPass):
                return(None)
            elif(a['password'] == '*'):
                return(None)
            else:
                return(a['user_id'])
        except KeyError:
            return(None)
        except:
            return(None)

        

    @staticmethod
    def create(data):
        a = profiles.find_one({'email': data['email']})
        if(str(a) == 'None'):
            profiles.insert_one(data)
            print('create method - user.py'.center(30,"="))
            return True
        else:
            return False
    
    @staticmethod
    def google_login(data):
        a = profiles.find_one({'email': data['email']})
        
        if(str(a) == 'None'):
            return False
        else:
            return True
    
    @staticmethod
    def get_user_info(id):
        a = profiles.find_one({'user_id': id})
        #print(a)
        return(a)
    
    @staticmethod
    def edit_user(id, data):
        try:
            profiles.find_one_and_update({"user_id": id}, {"$set": data} )
            return True
        except:
            return False

        


        
