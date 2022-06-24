import os
import openai
import pandas as pd
import numpy as np
from dotenv import load_dotenv, find_dotenv
from openai.embeddings_utils import get_embedding, cosine_similarity
load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")


# df = pd.concat((chunk for chunk in pd.read_csv(csvname,chunksize=5000)))


# search through the reviews for a specific product
def search_reviews(search_phrase, n=3, pprint=True):
    # df = pd.concat((chunk for chunk in pd.read_csv('./embeddings/embedded_season37_QA.csv', chunksize=1000, error_bad_lines=False, warn_bad_lines=True)))
    df = pd.read_csv('./embeddings/embedded_season37_QA.csv')
    df = df.tail(1000)
    df['curie_search'] = df.curie_search.apply(eval).apply(np.array)
    embedding = get_embedding(search_phrase, engine='text-search-curie-query-001')
    df['similarities'] = df.curie_search.apply(lambda x: cosine_similarity(x, embedding))

    res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Question: ', '').str.replace('; Answer:', '^')
    if pprint:
        for r in res:
            print(r[:200])
            print()
    return res



# def search_reviews(search_phrase, n=3, pprint=True):
#     df = pd.read_csv('embedded_1k_reviews_QandA.csv')
#     df['babbage_search'] = df.babbage_search.apply(eval).apply(np.array)
#     embedding = get_embedding(search_phrase, engine='text-search-babbage-query-001')
#     df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))

#     res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Question: ', '').str.replace('; Answer:', '^')
#     if pprint:
#         for r in res:
#             print(r[:200])
#             print()
#     return res

