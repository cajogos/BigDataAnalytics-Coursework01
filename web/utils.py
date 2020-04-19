from os import path
import json

# Loads the JSON files or returns error
def load_json_file(file_name):
    if path.exists(file_name) == False:
        return {"error": "{} does not exist".format(file_name)}

    output_file = open(file_name, 'r')
    response = json.loads(output_file.read())
    output_file.close()

    return response
