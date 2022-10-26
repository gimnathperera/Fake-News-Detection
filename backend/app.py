from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd 
from fake_news_detection_api import check_similarity

APP_ROOT = os.path.abspath(os.path.dirname(__file__))


# Init app
app = Flask(__name__)
CORS(app)


# Predict the news
@app.route('/api/news/predict', methods=['POST'])
def handle_predict_heart_failure():
    title = request.json['title']
    content = request.json['content']


    result = check_similarity(title, content)

    return jsonify(result)


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)  # Replace with your own IP address
