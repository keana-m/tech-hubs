import json
import requests
import pandas as pd
import pymongo
from pymongo import MongoClient
from config import jc_mongo_username, jc_mongo_password

## Connect to mongodb
client = MongoClient("mongodb+srv://" + jc_mongo_username + ":" + jc_mongo_password + "@techdata.hvqxz.mongodb.net/<dbname>?retryWrites=true&w=majority")

def cloud_collection(database, collection):
    # Read mongo database 
    db = client[database]

    # Read mongo collection
    return db[collection]

# Run to load data into the mongodb cloud
def load_df(df,database,collection):
    # Set collection to load data into 
    db_c = cloud_collection(database,collection)

    # Read CSV to pandas dataframe
    df.reset_index(inplace=True)
    json_data = df.to_dict('records')

    db_c.insert_many(json_data)

def readMongoCensus(database,collection):
    # Load cloud collection from cloud
    db_c = cloud_collection(database,collection)

    # Read collection to a pandas dataframe
    db_df = pd.DataFrame(list(db_c.find()))

    del db_df['_id']
    return db_df

def table_df(table_id,geo_str,acs="latest"):
    # Request education attainment data for the listed geo_ids
    request_url = f"{base_url}{acs}?table_ids={table_id}&geo_ids={geo_str}"
    
    response = requests.get(request_url)
    json = response.json()


    df = pd.DataFrame()


    col_keys = json['tables'][table_id]['columns']

    col_names = {}
    for column in col_keys:
            col_names[column] = col_keys[column]['name']   

    data = {} #{geoid1:{col_name1:value1,col_name2:value2},geoid2:{col_name1:value1,col_name2:value2}}
    for geo,city_name in geo_ids.items():
        data[city_name] = {}
        for col_id,name in col_names.items():
            data[city_name][name] = 100*json['data'][geo][table_id]['estimate'][col_id]/json['data'][geo][table_id]['estimate']["B15003001"]
        

    return pd.DataFrame(data)


#####
# RUN SECTION FOR CREATING DATAFRAME AND IMPORTING TO MONGODB
#####

# 

# # geoids of San Fran, Atlanta, Chicago, NYC, and Austin
# geo_ids = {"16000US0667000":"San Francisco, CA", 
#             "16000US1304000":"Atlanta, GA", 
#             "16000US1714000":"Chicago, IL", 
#             "16000US3651000":"New York, NY", 
#             "16000US4805000":"Austin, TX"}

# # Create comma delimited string of geo_ids
# geo_str = ",".join(geo_ids.keys())

# base_url = "https://api.censusreporter.org/1.0/data/show/"

# tables = {
#     "B15003":"Education Attainment",
#     "B08301":"Means of Transportation",
#     "B08303":"Time to travel to work"
# }

# # loop through the years for the dataframe
# for i in years: 

#     edu_df = table_df("B15003",geo_str,year)
#     edu_df = edu_df.transpose()
# print(edu_df)

# # Load data into database
# load_df(edu_df,"censusData","2019 Education Attainment")