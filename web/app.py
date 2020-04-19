from flask import Flask
from flask import render_template

from utils import load_json_file

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/api/index')
def api_index():
    file_name = '../piglatin/output/index.json'
    return load_json_file(file_name)

@app.route('/api/year/<int:year>')
def api_year(year):
    file_name = "../piglatin/output/year_{}.json".format(year)
    return load_json_file(file_name)
