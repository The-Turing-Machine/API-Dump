from flask import Flask, request, session, g, redirect, url_for, render_template, jsonify
from flask.ext.login import LoginManager, UserMixin, login_required, current_user
import requests
import json
import os
from flask.ext.cors import CORS
from pymongo import MongoClient
from OpenSSL import SSL
from flask.ext.bcrypt import Bcrypt



def connect():
    # Temporary !!
    connection = MongoClient("ds023118.mlab.com",23118)
    handle = connection["users"]
    handle.authenticate("admin","1234")# .......
    return handle

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
db = connect()

app.config.update(
    DEBUG=True,
    SECRET_KEY='SuperDuperSecretKey!',
    BCRYPT_LOG_ROUNDS = 12
)


@login_manager.request_loader
def load_user(request):
    token = request.headers.get('Authorization')
    if token is None:
        token = request.args.get('token')

    if token is not None:
        username,password = token.split(":") #edit this
        user_entry = User.get(username)
        if (user_entry is not None):
            user = User(user_entry['user'])
            if bcrypt.check_password_hash(user.password_hash, password) == True:
                return user
    return None
# connection = MongoClient("ds017205.mlab.com",17205)
# db = connection["my_widgets"]
# # MongoLab has user authentication
# db.authenticate("ayush", "ayush")
#
# widgets = db.widgets
#
# json_data = open("widget.json")
# new_widget = json.load(json_data)
# widgets.insert(new_widget)
