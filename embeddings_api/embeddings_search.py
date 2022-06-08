
import pandas as pd
import numpy as np


df = pd.read_csv('output/embedded_1k_reviews.csv')
df['babbage_search'] = df.babbage_search.apply(eval).apply(np.array)



from openai.embeddings_utils import get_embedding, cosine_similarity

# search through the reviews for a specific product
def search_reviews(df, product_description, n=3, pprint=True):
    embedding = get_embedding(product_description, engine='text-search-babbage-query-001')
    df['similarities'] = df.babbage_search.apply(lambda x: cosine_similarity(x, embedding))

    res = df.sort_values('similarities', ascending=False).head(n).combined.str.replace('Title: ','').str.replace('; Content:', ': ')
    if pprint:
        for r in res:
            print(r[:200])
            print()
    return res
res = search_reviews(df, 'delicious beans', n=3)