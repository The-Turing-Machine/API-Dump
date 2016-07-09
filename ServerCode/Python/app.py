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
    if db[collection].find({"username": user_data['username']}).count() > 0:
        stored_data = db[collection].find({"username": user_data['username']})
    else:
        return jsonify({'status':'User does not exist'})

    if bcrypt.check_password_hash(stored_data['hashed_password'], user_data['password']) == True:
        return jsonify({'status':'Logged In'})
    else:
        return jsonify({'status':'Wrong Password'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True,host='0.0.0.0',port=port)
