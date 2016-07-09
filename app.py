import sys
import pymongo
from pymongo import MongoClient
import json
connection = MongoClient("ds017175.mlab.com", 17175)
db = connection["apidump"]
# MongoLab has user authentication
db.authenticate("admin", "1234")
