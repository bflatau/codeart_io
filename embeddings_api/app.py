from flask import Flask
from flask import request, jsonify
import embeddings_search
import json
import multiprocessing
from openai.embeddings_utils import get_embedding
import os

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

import openai
openai.api_key = os.getenv("OPENAI_API_KEY")


def init_worker(id_queue, barrier):
    global worker_barrier

    worker_barrier = barrier
    i = id_queue.get()
    print(f'Loading data for worker {i}')
    embeddings_search.load_data(i)

def run_search_partition(embedding):
    global worker_barrier
    response_data = embeddings_search.search_reviews(embedding)
    print('this is api result', response_data)
    worker_barrier.wait()
    return response_data

if __name__ == '__main__':
    WORKERS = 8
    ctx = multiprocessing.get_context('spawn')
    id_queue = ctx.Queue()
    for i in range(WORKERS):
        id_queue.put(i)

    barrier = ctx.Barrier(WORKERS)

    with ctx.Pool(processes=WORKERS, initializer=init_worker, initargs=(id_queue, barrier)) as pool:
        app = Flask(__name__)

        @app.route("/")
        def hello_world():
            return "<p>Hello, World!</p>"

        @app.route("/embedding", methods=['POST'])
        def handle_embedding():
            data_string = request.get_data().decode('utf-8')
            print('this is request string', data_string)

            embedding = get_embedding(data_string, engine='text-search-babbage-query-001')
            print(embedding)
            responses = list(filter(lambda x: x is not None, pool.map(run_search_partition, [embedding]*(WORKERS))))
            responses.sort(key=lambda x: x['similarities'], reverse=True)
            print(responses)
            return jsonify(responses[0])

        app.run()
