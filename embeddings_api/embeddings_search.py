import os
import openai
# import pandas as pd
import modin.pandas as pd
import numpy as np
import time
from dotenv import load_dotenv, find_dotenv
from openai.embeddings_utils import get_embedding, cosine_similarity
load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")


start = time.time()
print('reading csv....')

df = pd.read_csv('./embeddings/embedded_120k_FILTERED_babbage.csv', error_bad_lines=False, engine="python")
# print(df)

print("Parsing embedding values...")
df['babbage_search'] = df.babbage_search.apply(eval).apply(np.array)
print("Done.")
end = time.time()
print(end - start)


def search_reviews(search_phrase, n=1, pprint=True):
    start = time.time()
    print(search_phrase)
    embedding = get_embedding(search_phrase, engine='text-search-babbage-query-001')
    df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))
    answer = df.loc[df['similarities'].idxmax()][['question', 'answer']].to_dict()
    end = time.time()
    print(end - start)

    return answer


