# We import Flask
from flask import Flask, render_template,jsonify
import json
from pymongo import MongoClient
from connections import readMongoCloud
from census import readMongoCensus

import os 

port = int(os.environ.get('PORT', 5000)) 
#app.run(host='0.0.0.0', port=port)

# We create a Flask app
app = Flask(__name__)

# We establish a Flask route so that we can serve HTTP traffic on that route 
@app.route('/')
def home():
    # We hardcode some information to be returned
    return render_template('index.html')

@app.route('/map')
def map():
    # We hardcode some information to be returned
    return render_template('map.html')

@app.route('/comparison')
def comparison():
    # We hardcode some information to be returned
    return render_template('comparison.html')

@app.route('/team')
def team():
    # We hardcode some information to be returned
    return render_template('team.html')

@app.route('/blog')
def blog():
    # We hardcode some information to be returned
    return render_template('blog.html')
	
@app.route('/techjobs')
def jobs():
    # We hardcode some information to be returned
    return render_template('jobs.html')

# @app.route("/readData")
# def read():
#     # Replace arguments with the name of your database and collection on mongodb
#     db_df = readMongoCloud("techjobs","techjobs")
#     return jsonify(db_df.to_dict('records'))

@app.route("/censusData")
def readCensus():
    # Replace arguments with the name of your database and collection on mongodb
    db_df = readMongoCensus("censusData","2019 Education Attainment")
    return jsonify(db_df.to_dict('records'))

# Get setup so that if we call the app directly (and it isn't being imported elsewhere)
# it will then run the app with the debug mode as True
# More info - https://docs.python.org/3/library/__main__.html
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=port)
