import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from numpy.linalg import norm
from string import digits
import pickle
import gensim
from gensim.utils import simple_preprocess
from gensim.parsing.preprocessing import STOPWORDS
from nltk.stem import WordNetLemmatizer, SnowballStemmer
from nltk.stem import PorterStemmer
from nltk.stem.porter import *
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import numpy as np
import nltk
from gensim import corpora, models

np.random.seed(2018)
nltk.download('all')


def fetch_data():
  data = pd.read_csv('True.csv', error_bad_lines=False);
  data_text = data[['text']]
  data_text['index'] = data_text.index 
  documents = data_text
  return documents

def lemmatize_stemming(text):
    stemmer = SnowballStemmer('english')
    return stemmer.stem(WordNetLemmatizer().lemmatize(text, pos='v'))

def preprocess(text):
    result = []
    for token in gensim.utils.simple_preprocess(text):
        if token not in gensim.parsing.preprocessing.STOPWORDS and len (token) > 3:
            result.append(lemmatize_stemming(token))
    return result

processed_docs = fetch_data()['text'].map(preprocess)

dictionary = gensim.corpora.Dictionary(processed_docs)
count = 0
for k, v in dictionary.iteritems():
    count += 1
    if count > 10:
        break

dictionary.filter_extremes(no_below=15, no_above=0.5, keep_n=100000)


lda_model = models.LdaModel.load('lda.model')

def lda_model_head (heading):
    topic_list_head = ''
    bow_vector = dictionary.doc2bow(preprocess(heading))
    count=0
    for index, score in sorted(lda_model[bow_vector], key=lambda tup: -1*tup[1]):
        if count==0:
            topic_list_head=lda_model.print_topic(index, 10)
            print(topic_list_head)
            count=count+1
    ret_head = topic_list_head
    return ret_head

remove_digits = str.maketrans('', '', digits)

def best_head (top_head):
    rest = top_head.translate(remove_digits)
    final_list_head = re.sub(r'[^\w\s]', '', rest)
    flh = final_list_head.split()
    return flh


def lad_model_content(content):
    topic_list_content = ''
    bow_vector = dictionary.doc2bow(preprocess(content))
    count=0
    for index, score in sorted(lda_model[bow_vector], key=lambda tup: -1*tup[1]):
        if count==0:
            topic_list_content=lda_model.print_topic(index, 10)
            count=count+1
        print("Score: {}\t Topic: {}".format(score, lda_model.print_topic(index, 10)))
    ret_content = topic_list_content
    return ret_content
    

def best_content(top_content):
    rest = top_content.translate(remove_digits)
    final_list_content = re.sub(r'[^\w\s]', '', rest)
    print(final_list_content.split())
    flc = (final_list_content.split())

    return flc



def check_similarity(title, content):

    top_head = lda_model_head(title)
    best_head_final = best_head(top_head)

    top_content = lad_model_content(content)
    best_content_final = best_content(top_content)

    sw = stopwords.words('english')
    l1 =[];l2 =[]

    x_set = {w for w in best_head_final if not w in sw}
    y_set = {w for w in best_content_final if not w in sw}

    rvector = x_set.union(y_set) 
    for w in rvector:
        if w in best_head_final: l1.append(1)
        else: l1.append(0)
        if w in best_content_final: l2.append(1)
        else: l2.append(0)
    c = 0

    for i in range(len(rvector)):
        c+= l1[i]*l2[i]
    cosine = c / float((sum(l1)*sum(l2))**0.5)

    print("title", content)
    return {"similarity": cosine}
