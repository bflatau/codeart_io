import os
import openai
import pandas as pd


openai.api_key = os.getenv("OPENAI_API_KEY")

df = pd.read_csv('combined_season1-37.tsv',  sep='\t') #read file
df = df[[ 'answer', 'question']] #name the columns we want
df = df.dropna() #remove all the columns not identified above
df['combined'] = "Question: " + df.question.str.strip() + "; Answer: " + df.answer.str.strip() #make superstring?
#df.head(6) #this tests N rows to see if the data looks correct

df = df.tail(1000) # set df to the last N number of values to work with
#len(df) #output length


from openai.embeddings_utils import get_embedding

# This will take just under 10 minutes
df['babbage_similarity'] = df.combined.apply(lambda x: get_embedding(x, engine='text-similarity-babbage-001'))
df['babbage_search'] = df.combined.apply(lambda x: get_embedding(x, engine='text-search-babbage-doc-001'))
df.to_csv('embedded_1k_reviews.csv')