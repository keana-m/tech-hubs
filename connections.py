import sys
import pandas as pd
import pymongo
import csv
import json
from config import mongo_username, mongo_password
from pymongo import MongoClient
from flask import Flask, jsonify, render_template

#cloud mongo connect
cloudMClnt = MongoClient()
cloudMClnt = MongoClient("mongodb+srv://" + mongo_username + ":" + mongo_password + "@techdata.hvqxz.mongodb.net/<dbname>?retryWrites=true&w=majority")

def cloud_collection(database, collection):
    # Read mongo database 
    db = cloudMClnt["ACSData"]

    # Read mongo collection
    return db[collection]

# Run to load data into the mongodb cloud
def load_csv(filename,database,collection):
    # Set collection to load data into 
    db_c = cloud_collection(database,collection)

    # Read CSV to pandas dataframe
    db_df = pd.read_csv(filename, header=0)

    # Convert pandas dataframe to json
    json_data = db_df.to_dict('records')

    # Load csv into mongo collection
    db_c.insert_many(json_data)


def readMongoCloud(database,collection):
    # Load cloud collection from cloud
    acs_commute = cloud_collection(database,collection)

    # Read collection to a pandas dataframe
    acs_commute_df = pd.DataFrame(list(acs_commute.find().sort([
        ('ID',1)
    ])))

    del acs_commute_df['_id']
    return acs_commute_df

# # Run to load data
# load_csv('data/acs2019_1yr_B08105A_16000US4805000/acs2019_1yr_B08105A_16000US4805000.csv',"ACSData", "ACS2019_commute")
