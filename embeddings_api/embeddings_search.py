import os
import pandas as pd
import numpy as np
import random
import re
import time

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

embeddings_filename_root = 'embedded_120k_FILTERED_ada'


df = None
def load_data(i):
    global df
    start_load = time.time()

    # # To Pickle
    # CHUNK = 16000
    # skip_rows = i*CHUNK
    # nrows=CHUNK

    # d = pd.read_csv(f'./embeddings/{embeddings_filename_root}.csv', on_bad_lines='error', engine="python", skiprows=range(1, skip_rows + 1), nrows=nrows)

    # print("Parsing embedding values...")
    # d['ada_embedding'] = d.ada_embedding.apply(eval).apply(np.array)
    # print("Done.")

    # df = d

    # df.to_pickle(f'./embeddings/{embeddings_filename_root}_{i}.pickle')

    # print(f'done pickling {i}')


    # From Pickle
    df = pd.read_pickle(f'./embeddings/{embeddings_filename_root}_{i}.pickle')

    print(f"Loading data took {time.time() - start_load} seconds")



def search_reviews(embedding):
    global df
    if len(df) == 0:
        print(df)
        return None
    df['similarities'] = df.ada_embedding.apply(lambda x: cosine_similarity(x, embedding))

    # # Select top N, then pick one at random
    # res = df.sort_values('similarities', ascending=False).head(n)[[ 'answer', 'question']]
    # data = res.to_dict(orient='records')
    # print(data)
    # answer = random.choice(data)
    # print(answer)

    answer = df.loc[df['similarities'].idxmax()][['question', 'answer', 'similarities']].to_dict()

    return answer
