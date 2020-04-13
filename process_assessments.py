import pandas as pd
import numpy as np

pd.set_option('display.max_columns', None)

raw = pd.read_csv('raw/assessments.csv')

# >>> raw.columns # ALL COLUMNS
# Index(['assessmentId', 'internalTaxonId', 'scientificName', 'redlistCategory',
#        'redlistCriteria', 'yearPublished', 'assessmentDate', 'criteriaVersion',
#        'language', 'rationale', 'habitat', 'threats', 'population',
#        'populationTrend', 'range', 'useTrade', 'systems',
#        'conservationActions', 'realm', 'yearLastSeen', 'possiblyExtinct',
#        'possiblyExtinctInTheWild', 'scopes'],
#       dtype='object')

# Remove the following "clutter columns"
to_drop = [
    'redlistCriteria', 'criteriaVersion',
    'language', 'rationale', 'habitat',
    'threats', 'population', 'range',
    'useTrade', 'conservationActions', 'yearLastSeen',
    'possiblyExtinct', 'possiblyExtinctInTheWild'
]
raw.drop(columns = to_drop, inplace = True)

raw.head()



# Save new processed version for upload to HDFS
raw.to_csv('processed/assessments.csv', index = False)
