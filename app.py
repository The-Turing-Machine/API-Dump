import sys
import pymongo
from pymongo import MongoClient
import json

connection = MongoClient("ds017205.mlab.com",17205)
db = connection["my_widgets"]
# MongoLab has user authentication
db.authenticate("ayush", "ayush")

widgets = db.widgets

json_data = open("widget.json")
new_widget = json.load(json_data)
widgets.insert(new_widget)
