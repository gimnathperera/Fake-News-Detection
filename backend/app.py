from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd 


APP_ROOT = os.path.abspath(os.path.dirname(__file__))
# loaded_model = joblib.load("news_model.pickle")

# Predict the new status
def predict_data(data):
    prediction = loaded_model.predict(data)

    return jsonify(prediction)


# Init app
app = Flask(__name__)
CORS(app)


# Predict the crime
@app.route('/api/news/predict', methods=['POST'])
def handle_predict_heart_failure():
    title = request.json['title']
    content = request.json['content']
    

    lst = [[title, content]]
    payload = pd.DataFrame(lst, columns =['title', 'content']) 


    result = predict_data(payload)

    return result


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)  # Replace with your own IP address
