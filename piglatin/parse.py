from os import path
from datetime import datetime
import json

file_name = "input.data"

if path.exists(file_name) == False:
    raise Exception("{} is not present.".format(file_name))

output = {}
years = []


input_file = open(file_name, "r")
for line in input_file.readlines():
    json_result = json.loads(line.strip())

    year = json_result['group']
    assessments = json_result['assessments']

    output[year] = {}
    output[year]['year'] = year
    output[year]['count'] = len(assessments)
    output[year]['assessments'] = assessments

    years.append(json_result['group'])
input_file.close()

# Save individual year file in output
for year in output:
    file_name = "output/year_{}.json".format(year)
    print("Generating output file {}...".format(file_name))
    output_file = open(file_name, 'w')
    output_file.write(json.dumps(output[year], indent=2))
    output_file.close()

info = {}
info['generated'] = str(datetime.now())
info['years'] = years

# Save file containing output information
print("Generating index file...")
output_file = open('output/index.json', 'w')
output_file.write(json.dumps(info, indent=2))
output_file.close()
