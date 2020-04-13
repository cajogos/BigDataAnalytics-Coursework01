import pandas as pd
import time

pd.set_option('display.max_columns', None)

raw = pd.read_csv('raw/taxonomy.csv')

# >>> raw.columns # ALL COLUMNS
# Index(['internalTaxonId', 'scientificName', 'kingdomName', 'phylumName',
#        'orderName', 'className', 'familyName', 'genusName', 'speciesName',
#        'infraType', 'infraName', 'infraAuthority', 'subpopulationName',
#        'authority', 'taxonomicNotes'],
#       dtype='object')

# Remove the following "clutter columns"
to_drop = [
    'infraType', 'infraName', 'infraAuthority', 'subpopulationName',
    'authority', 'taxonomicNotes'
]
raw.drop(columns = to_drop, inplace = True)

# Save new processed version for upload to HDFS
timestr = time.strftime("%Y%m%d-%H%M%S")
raw.to_csv('processed/taxonomy-' + timestr + '.csv', index = False)

print(raw.head())
