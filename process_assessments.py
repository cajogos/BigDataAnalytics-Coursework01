import pandas as pd
import time

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
    'possiblyExtinct', 'possiblyExtinctInTheWild',
    'realm', 'scopes', 'systems'
]
raw.drop(columns = to_drop, inplace = True)

# Convert assessment date into year only
raw['assessmentYear'] = pd.DatetimeIndex(raw['assessmentDate']).year

raw.drop(columns = ['assessmentDate'], inplace = True)

# Save new processed version for upload to HDFS
timestr = time.strftime("%Y%m%d-%H%M%S")
raw.to_csv('processed/assessments-' + timestr + '.csv', index = False)

print(raw.head())
