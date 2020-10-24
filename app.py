# We import Flask
from flask import Flask, render_template,jsonify
import json
from pymongo import MongoClient
from connections import readMongoCloud
    
# We create a Flask app
app = Flask(__name__)

# We establish a Flask route so that we can serve HTTP traffic on that route 
@app.route('/')
def home():
    # We hardcode some information to be returned
    return render_template('index.html')

# We create a route to the map.html which shows tech_hub_crime.js data 
@app.route('/map')
def map():
    # We hardcode some information to be returned
    return render_template('map.html')


@app.route("/readData")
def read():
    # Replace arguments with the name of your database and collection on mongodb
    db_df = readMongoCloud("ACSData","ACS2019_commute")
    return jsonify(db_df.to_dict('records'))

# Get setup so that if we call the app directly (and it isn't being imported elsewhere)
# it will then run the app with the debug mode as True
# More info - https://docs.python.org/3/library/__main__.html
if __name__ == '__main__':
    app.run(debug=True)

    