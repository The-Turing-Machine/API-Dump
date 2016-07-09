from flask import Flask, request, session, g, redirect, url_for, render_template, jsonify
import json
import os
# from flask.ext.cors import CORS
from pymongo import MongoClient

def connect():
    connection = MongoClient("ds023118.mlab.com",23118)
    handle = connection["users"]
    handle.authenticate("admin","1234")
    return handle

app = Flask(__name__)
# CORS(app)
db = connect()

@app.route('/')
def home():
    return 'Yo'


@app.route('/login', methods = ['POST'])
def login():
    user_data = request.json
    print user_data


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True,host='0.0.0.0',port=port)
