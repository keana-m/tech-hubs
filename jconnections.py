import sys
import pandas as pd
import pymongo
import csv
import json
from config import mongo_username, mongo_password
from pymongo import MongoClient
from flask import Flask, jsonify, render_template
from urllib.request import urlopen

#cloud mongo connect
cloudMClnt = MongoClient()
cloudMClnt = MongoClient("mongodb+srv://" + mongo_username + ":" + mongo_password + "@cluster0.f8gqg.mongodb.net/<dbname>?retryWrites=true&w=majority")

def cloud_collection(database, collection):
    # Read mongo database 
    db = cloudMClnt[database]

    # Read mongo collection
    return db[collection]

# Run to load data into the mongodb cloud
def load_json(url,database,collection):
    # Set collection to load data into 
    db_c = cloud_collection(database,collection)

    # # Read CSV to pandas dataframe
    # db_df = pd.read_csv(filename, header=0)

    # # Convert pandas dataframe to json
    # json_data = db_df.to_dict('records')

    response = urlopen(url)
    data = response.read().decode("utf-8")
    json_data = json.loads(data)

    # Load csv into mongo collection
    db_c.insert_many(json_data)

# Run to load data. only use to load data, comment out after
load_json("https://data.cityofnewyork.us/resource/qgea-i56i.json","nyc_crime", "nyc_crime")
