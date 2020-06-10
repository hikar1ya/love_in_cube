from bson import ObjectId

import gift
from flask import Flask, jsonify, render_template, Response, json
import pymongo
import ssl

app = Flask(__name__, template_folder='templates')
app.config['JSON_AS_ASCII'] = False

@app.route('/')
@app.route('/index')
def main_page():
    return "Привет, мир!"

def connect_to_database():
    client = pymongo.MongoClient(
        "mongodb+srv://vdno:kurluk@cluster0-lesec.gcp.mongodb.net/test?retryWrites=true&w=majority")
    db = client.database
    collection = db.gift
    return collection

@app.route('/catalog', methods=['GET'])
def get_all():
    collection = connect_to_database()
    my_cursor = collection.find({"_id" : ObjectId('5eb3df1289fdccf6ec6e6152')})

    result = []
    for item in my_cursor:
        item["_id"] = str(item["_id"])
        result.append(item)
    #return jsonify({'result': result})
    #return result
    return render_template("index.html", result = result)

def get_by_id(id):
    collection = connect_to_database()
    my_cursor = collection.find({"_id" : ObjectId(id)})
    result = []
    for item in my_cursor:
        result.append(item)
    return jsonify({'result': result})

app.run()