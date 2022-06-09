from flask import Flask
from flask import request, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/embeddings", methods=['GET', 'POST', 'DELETE'])
def handle_embedding():
    data = request.body
    print(data)
    print(data['question'])
    return "<p>Hello, World!</p>"
