# PIG Notes

```sql
/* Load Assessments Data generated from HIVE */
assessments = LOAD '/user/maria_dev/cwk/from_hive/assessments.csv' USING PigStorage(',')
    AS (assessmentID:int, taxonID:int, scientificName:chararray, kingdomName:chararray,
    	genus:chararray, species:chararray, category:chararray, populationTrend:chararray,
        year:int, pubYear:int);
DESCRIBE assessments;

/* Load Points Data generated from HIVE */
points = LOAD '/user/maria_dev/cwk/from_hive/points_data.csv' USING PigStorage(',')
    AS (assessmentID:int, taxonID:int, year:int, eventYear:int, lon:float, lat:float);
DESCRIBE points;

/* Clean-up the Assessments by dropping unneeded columns */
assessments = FOREACH assessments GENERATE assessmentID AS id, taxonID, pubYear, year,
				scientificName, kingdomName, category, populationTrend;
DESCRIBE assessments;

/* Clean-up the Points Data by dropping uneeded columns */
points = FOREACH points GENERATE assessmentID, eventYear, lon, lat;
DESCRIBE points;

/* Group the points data by assessment ID */
pointsByAssessment = GROUP points BY assessmentID;
DESCRIBE pointsByAssessment;

/* Merge both by assessment ID */
merged = JOIN assessments BY id LEFT OUTER, pointsByAssessment BY group;
DESCRIBE merged;

/* Clean-up the Merged results with correct keys */
assessments = FOREACH merged GENERATE assessments::id AS id, assessments::taxonID AS taxonID, assessments::pubYear AS pubYear,
				assessments::year AS year, assessments::scientificName AS name, assessments::kingdomName AS kingdom,
                assessments::category AS category, assessments::populationTrend AS popTrend, pointsByAssessment::points AS points;
DESCRIBE assessments;

/* Group the assessments by year */
assessmentsByYear = GROUP assessments BY year;
DESCRIBE assessmentsByYear;

/* Store the result in a JSON file */
STORE assessmentsByYear INTO '/user/maria_dev/cwk/pig/results/assessments_by_year.json' USING JsonStorage();
```

