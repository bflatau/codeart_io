from flask import Flask
from flask import request, jsonify
import embeddings_search
import json




app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/embedding", methods=['POST'])
def handle_embedding():
    data_string = request.get_data().decode('utf-8')
    response_data = embeddings_search.search_reviews(data_string, n=5, pprint=True)
    print('this is request string', data_string)
    print('this is api result', response_data)
    return jsonify(response_data)
