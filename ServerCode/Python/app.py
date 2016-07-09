from flask import Flask, request, session, g, redirect, url_for, render_template, jsonify
import json
import os
from flask_bcrypt import Bcrypt
# from flask.ext.cors import CORS
from pymongo import MongoClient

def connect():
    connection = MongoClient("ds017155.mlab.com",17155)
    handle = connection["login_data"]
    handle.authenticate("Yo@admin","1234")
    return handle

app = Flask(__name__)
# CORS(app)
bcrypt = Bcrypt(app)
db = connect()
collection = 'login_user_data'
@app.route('/')
def home():
    return 'Yo'


@app.route('/login', methods = ['POST'])
def login():
    user_data = request.json
    if db[collection].find({"username": user_data['username']}).limit(1).count() > 0:
        stored_data = db[collection].find({"username": user_data['username']})
    else:
        # return jsonify({'status':'User does not exist'})
        return '404'

    if bcrypt.check_password_hash(stored_data['hashed_password'], user_data['password']) == True:
        # return jsonify({'status':'Logged In'})
        return '200'
    else:
        # return jsonify({'status':'Wrong Password'})
        return '405'


@app.route('/register', methods = ['POST'])
def register():
    user_data = request.json
    if db[collection].find({"username": user_data['username']}).limit(1).count() > 0:
        # return jsonify({'status':'User already exists'})
        return '400'
    else:
        db[collection].insert(
        {
            'user':user_data['username'],
            'hashed_password': bcrypt.generate_password_hash(user_data['password'],12)
        })
        # return jsonify({'status':'Created User'})
        return '202'


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True,host='0.0.0.0',port=port)
