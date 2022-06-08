import os
import openai
openai.organization = "YOUR_ORG_ID"
openai.api_key = os.getenv("OPENAI_API_KEY")
#openai.Model.list()


import pandas as pd

df = pd.read_csv('input/Reviews.csv', index_col=0)
df = df[['Time', 'ProductId', 'UserId', 'Score', 'Summary', 'Text']]
df = df.dropna()
df['combined'] = "Title: " + df.Summary.str.strip() + "; Content: " + df.Text.str.strip()
df.head(2)


# subsample to 1k most recent reviews and remove samples that are too long
df = df.sort_values('Time').tail(1_100)
df.drop('Time', axis=1, inplace=True)

from transformers import GPT2TokenizerFast
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

# remove reviews that are too long
df['n_tokens'] = df.combined.apply(lambda x: len(tokenizer.encode(x)))
df = df[df.n_tokens<2000].tail(1_000)
len(df)



from openai.embeddings_utils import get_embedding

# This will take just under 10 minutes
df['babbage_similarity'] = df.combined.apply(lambda x: get_embedding(x, engine='text-similarity-babbage-001'))
df['babbage_search'] = df.combined.apply(lambda x: get_embedding(x, engine='text-search-babbage-doc-001'))
df.to_csv('output/embedded_1k_reviews.csv')
