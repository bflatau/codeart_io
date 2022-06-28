import os
import openai
import pandas as pd
import numpy as np
import random
import re
from dotenv import load_dotenv, find_dotenv
from openai.embeddings_utils import get_embedding, cosine_similarity
load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")

ALLOWED_REGEX = r'[a-zA-Z\$\*\%\&\@\!\?\#\'\,\" ]*'

df = pd.read_csv('./embeddings/embedded_season37_QA_babbage.csv', error_bad_lines=False, engine="python")
print(df)

# Filter out embeddings with characters we can't display
df = df[df.apply(lambda row: (re.fullmatch(ALLOWED_REGEX, row['answer']) is not None) and (re.fullmatch(ALLOWED_REGEX, row['question']) is not None), axis=1)]
print("FILTERED")
print(df)

print("Parsing embedding values...")
df['babbage_search'] = df.babbage_search.apply(eval).apply(np.array)
print("Done.")

def search_reviews(search_phrase, n=1, pprint=True):
    print(search_phrase)
    embedding = get_embedding(search_phrase, engine='text-search-babbage-query-001')
    df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))

    # Select top N, then pick one at random
    res = df.sort_values('similarities', ascending=False).head(n)[[ 'answer', 'question']]
    data = res.to_dict(orient='records')
    print(data)
    answer = random.choice(data)
    print(answer)
    return answer






# def search_reviews(search_phrase, n=3, pprint=True):
#     df= pd.read_csv('./embeddings/embedded_season37_QA_curie.csv', error_bad_lines=False, engine="python")  # the number of rows per chunk
#     df['curie_search'] = df.curie_search.apply(eval).apply(np.array)
#     embedding = get_embedding(search_phrase, engine='text-search-curie-query-001')
#     df['similarities'] = df.curie_search.apply(lambda x: cosine_similarity(x, embedding))

#     res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Question: ', '').str.replace('; Answer:', '^')
#     if pprint:
#         for r in res:
#             print(r[:200])
#             print()
#     return res











# search through the reviews for a specific product
# def search_reviews(search_phrase, n=3, pprint=True):
#     df = pd.read_csv('./embeddings/embedded_season37_QA.csv', nrows=1000) 
#     df['curie_search'] = df.curie_search.apply(eval).apply(np.array)
#     embedding = get_embedding(search_phrase, engine='text-search-curie-query-001')
#     df['similarities'] = df.curie_search.apply(lambda x: cosine_similarity(x, embedding))

#     res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Question: ', '').str.replace('; Answer:', '^')
#     if pprint:
#         for r in res:
#             print(r[:200])
#             print()
#     return res



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


