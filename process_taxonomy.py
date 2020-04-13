import pandas as pd
import numpy as np

pd.set_option('display.max_columns', None)

raw = pd.read_csv('raw/taxonomy.csv')

# Remove the following "clutter columns"
to_drop = [
]
raw.drop(columns = to_drop, inplace = True)

print(raw.head())


# Save new processed version for upload to HDFS
raw.to_csv('processed/taxonomy.csv', index = False)
