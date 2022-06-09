from flask import Flask
from flask import request, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/embedding", methods=['GET', 'POST', 'DELETE'])
def handle_embedding():
    data = request.get_json()
    print(data)
    # print(data['question'])
    return "<p>GOODBYE, World!</p>"







# (pip install flask[async]).
# @app.route("/get-data")
# async def get_data():
#     data = await async_db_query(...)
#     return jsonify(data)