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
    json_data = request.get_json()
    data_string = json.dumps(json_data)
    response_data = embeddings_search.search_reviews(data_string, n=1, pprint=False).item()
    response_data_string = str(response_data).replace('\\', '')
    print('this is request string', data_string)
    print('this is api result', response_data_string)
    return jsonify(response_data_string)

