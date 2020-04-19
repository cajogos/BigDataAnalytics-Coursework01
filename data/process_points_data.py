import pandas as pd
import time

pd.set_option('display.max_columns', None)

raw = pd.read_csv('raw/points_data.csv')

# >>> raw.columns # ALL COLUMNS
# Index(['assessment_id', 'id_no', 'binomial', 'presence', 'origin', 'seasonal',
#        'compiler', 'year', 'citation', 'legend', 'subspecies', 'subpop',
#        'dist_comm', 'island', 'tax_comm', 'source', 'basisofrec', 'event_year',
#        'longitude', 'latitude'],
#       dtype='object')

# Remove the following "clutter columns"
to_drop = [
    'presence', 'origin', 'seasonal',
    'compiler', 'citation', 'legend', 'subspecies',
    'subpop', 'dist_comm', 'island', 'tax_comm',
    'source', 'basisofrec'
]
raw.drop(columns = to_drop, inplace = True)

# Drop rows with NA values
raw.dropna(subset = [ 'year', 'event_year'], inplace = True)

# Convert event_year to integers
raw.event_year = raw.event_year.astype(int)

# Save new processed version for upload to HDFS
timestr = time.strftime("%Y%m%d-%H%M%S")
raw.to_csv('processed/points_data-' + timestr + '.csv', index = False)

print(raw.head())
