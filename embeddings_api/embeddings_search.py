import os
import openai
import pandas as pd
import numpy as np
from dotenv import load_dotenv, find_dotenv
from openai.embeddings_utils import get_embedding, cosine_similarity
load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")



# import pandas as pd
  
# # making data frame from csv file 
# data = pd.read_csv("employees.csv")
  
# # generating one row 
# row1 = data.sample(n = 1)



def search_reviews(search_phrase, n=1, pprint=True):
    df = pd.read_csv('./embeddings/embedded_season37_QA_babbage.csv', error_bad_lines=False, engine="python")  # the number of rows per chunk
    
    df = df.sample(n=5000)
    
    df['babbage_search'] = df.babbage_search.apply(eval).apply(np.array)
    embedding = get_embedding(search_phrase, engine='text-search-babbage-query-001')
    df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))

    res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Question: ', '').str.replace('; Answer:', '^')
    if pprint:
        for r in res:
            print(r[:200])
            print()
    return res






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


