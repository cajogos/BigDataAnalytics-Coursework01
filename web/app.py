from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/api')
def json_response():
    return {
        "test": "Hello!",
        "number": 1234
    }
