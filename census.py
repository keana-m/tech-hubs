import json
import requests
import pandas as pd
from pprint import pprint

# geoids of San Fran, Atlanta, Chicago, NYC, and Austin
geo_ids = {"16000US0667000":"San Francisco, CA", 
            "16000US1304000":"Atlanta, GA", 
            "16000US1714000":"Chicago, IL", 
            "16000US3651000":"New York, NY", 
            "16000US4805000":"Austin, TX"}

# Create comma delimited string of geo_ids
geo_str = ",".join(geo_ids.keys())


base_url = "https://api.censusreporter.org/1.0/data/show/"

def table_df(table_id,geo_str,acs="latest"):
    # Request education attainment data for the listed geo_ids
    request_url = f"{base_url}{acs}?table_ids={table_id}&geo_ids={geo_str}"
    print(request_url)
    response = requests.get(request_url)
    json = response.json()
    pprint(json)


    df = pd.DataFrame()


    col_keys = json['tables'][table_id]['columns']

    col_names = {}
    for column in col_keys:
            col_names[column] = col_keys[column]['name']   

    data = {} #{geoid1:{col_name1:value1,col_name2:value2},geoid2:{col_name1:value1,col_name2:value2}}
    for geo,city_name in geo_ids.items():
        data[city_name] = {}
        for col_id,name in col_names.items():
            data[city_name][name] = json['data'][geo][table_id]['estimate'][col_id]
        

    return pd.DataFrame(data)



# Latest Education Attainment table
edu_df = table_df("B15003",geo_str)

print(edu_df)