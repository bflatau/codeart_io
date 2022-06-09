import os
import openai
import pandas as pd
import numpy as np
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")

df = pd.read_csv('embedded_1k_reviews.csv')
df['babbage_search'] = df.babbage_search.apply(eval).apply(np.array)

from openai.embeddings_utils import get_embedding, cosine_similarity

# search through the reviews for a specific product
def search_reviews(df, search_phrase, n=3, pprint=True):
    embedding = get_embedding(search_phrase, engine='text-search-babbage-query-001')
    df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))

    res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Question: ','').str.replace('; Answer:', ': ')
    if pprint:
        for r in res:
            print(r[:200])
            print()
    return res
res = search_reviews(df, 'car', n=3)