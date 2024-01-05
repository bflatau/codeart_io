import os
from openai import OpenAI
import pandas as pd
import re
import time
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())
client = OpenAI(
  api_key = os.getenv("OPENAI_API_KEY"),
)


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




df = pd.read_csv('./embeddings/combined_season1-37.tsv',  sep='\t') #read file
df = df[[ 'answer', 'question']] #name the columns we want
df = df.dropna() #remove all the columns not identified above
print(len(df))

# Filter out embeddings with characters we can't display
df = df[df.apply(lambda row: isDisplayableInOnePage(row['answer']) and isDisplayableInOnePage(row['question']), axis=1)]
print("FILTERED")
print(len(df))

df['combined'] = "Question: " + df.question.str.strip() + "; Answer: " + df.answer.str.strip() #make superstring?


# For testing: select a subset of rows
df = df.head(15)
print("SELECTED SUBSET")
print(len(df))



def get_embedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ") #not sure if this is needed?
   try:
      return client.embeddings.create(input = [text], model=model).data[0].embedding
   except Exception as e:
      print(e)
      return "ERR"

df['ada_embedding'] = df.combined.apply(lambda x: get_embedding(x, model='text-embedding-ada-002'))

df.to_csv(f'./embeddings/embedded_120k_FILTERED_ada_{int(time.time()*1000)}.csv', index=False)


print("FINISHED!")