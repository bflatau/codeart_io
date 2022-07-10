import os
import pandas as pd
import numpy as np
import random
import re
import time
from openai.embeddings_utils import cosine_similarity


ALLOWED_REGEX = r'[a-zA-Z\$\*\%\&\@\!\?\#\'\,\" ]*'

def translateToSplitflapAlphabet(text):
    return text.replace("'", '').replace('"', '*').replace(',', '')

def wrap(text, rowLength):
    rows = []

    lines = text.split('\n')
    for line in lines:
        curRow = []
        curRowLength = 0
        words = line.split(' ')

        for word in words:
            if curRowLength + len(word) <= rowLength:
                curRowLength += len(word) + 1
                curRow.append(word)
            else:
                rows.append(curRow)
                curRow = [word]
                curRowLength = len(word) + 1
        rows.append(curRow)

    return list(map(lambda row: ' '.join(row), rows))

def isDisplayableInOnePage(text):
    characters_ok = (re.fullmatch(ALLOWED_REGEX, text) is not None)
    wrapped = wrap(translateToSplitflapAlphabet(text), 18)
    return characters_ok and len(wrapped) <= 6

# print(df)
# df['babbage_search'] = df.babbage_search.apply(lambda row: np.array(eval(row)))
# df.to_pickle('embeddings/embedded_120k_FILTERED_babbage.pickle.gz')

# exit(0)

df = None
def load_data(i):
    global df
    start_load = time.time()

    # To Pickle
    # CHUNK = 16000
    # skip_rows = i*CHUNK
    # nrows=CHUNK

    # d = pd.read_csv('./embeddings/embedded_120k_FILTERED_babbage.csv', error_bad_lines=False, engine="python", skiprows=range(1, skip_rows + 1), nrows=nrows)

    # del d['babbage_similarity']

    # # Filter out embeddings with characters we can't display
    # d = d[d.apply(lambda row: isDisplayableInOnePage(row['answer']) and isDisplayableInOnePage(row['question']), axis=1)]
    # print("FILTERED")
    # print(d)

    # print("Parsing embedding values...")
    # d['babbage_search'] = d.babbage_search.apply(eval).apply(np.array)
    # print("Done.")

    # df = d

    # df.to_pickle(f'./embeddings/embedded_120k_FILTERED_babbage_{i}.pickle')

    # print('done pickling')


    # From Pickle
    df = pd.read_pickle(f'./embeddings/embedded_120k_FILTERED_babbage_{i}.pickle')

    print(f"Loading data took {time.time() - start_load} seconds")



def search_reviews(embedding):
    global df
    if len(df) == 0:
        print(df)
        return None
    df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))

    # # Select top N, then pick one at random
    # res = df.sort_values('similarities', ascending=False).head(n)[[ 'answer', 'question']]
    # data = res.to_dict(orient='records')
    # print(data)
    # answer = random.choice(data)
    # print(answer)

    answer = df.loc[df['similarities'].idxmax()][['question', 'answer', 'similarities']].to_dict()

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


