# HIVE and HQL Notes

These are notes of queries we can run on HIVE in Ambari. These are HQL (SQL subset) queries.

**Query to get the number of assessments per year:**

```sql
SELECT yearpublished, COUNT(*) AS num FROM assessments GROUP BY yearpublished ORDER BY yearpublished DESC;
```

* ~~Excluded 1996 because there was only 1 assessment and was done in a old date. Stick to 20 years data~~.
* Decided to include the years with no assessments - just have to handle that on the display.

---

**Query to get information from Taxonomy + Assessments table with proper column names:**

```sql
SELECT
	a.assessmentid AS assessmentID,
	t.internaltaxonid AS taxonID,
	t.scientificname AS sciName,
	t.kingdomname AS kingdom,
	a.redlistcategory AS category,
	a.populationtrend AS popTrend,
	a.assessmentYear AS year,
	a.yearpublished AS pubYear
FROM assessments a
LEFT OUTER JOIN taxonomy t ON (a.internaltaxonid = t.internaltaxonid);
```

Same query but with added Genus+Species and ordered by year (assessment year) in descending order (takes long to run ~5mins because of `ORDER BY`):

```sql
SELECT
	a.assessmentid AS assessmentID,
	t.internaltaxonid AS taxonID,
	t.scientificname AS sciName,
	t.kingdomname AS kingdom,
	t.genusname AS genus,
	t.speciesname AS species,
	a.redlistcategory AS category,
	a.populationtrend AS popTrend,
	a.assessmentYear AS year,
	a.yearpublished AS pubYear
FROM assessments a
LEFT OUTER JOIN taxonomy t ON (a.internaltaxonid = t.internaltaxonid)
ORDER BY year DESC;
```

Using `CLUSTER BY` (shorthand for `DISTRIBUTE BY col SORT BY col`) instead of `ORDER BY` makes the query faster as it will distribute the rows in different reducers but does not guarantee proper sorting.

```sql
SELECT
	a.assessmentid AS assessmentID,
	t.internaltaxonid AS taxonID,
	t.scientificname AS sciName,
	t.kingdomname AS kingdom,
	t.genusname AS genus,
	t.speciesname AS species,
	a.redlistcategory AS category,
	a.populationtrend AS popTrend,
	a.assessmentYear AS year,
	a.yearpublished AS pubYear
FROM assessments a
LEFT OUTER JOIN taxonomy t ON (a.internaltaxonid = t.internaltaxonid)
CLUSTER BY year, poptrend;
```

**Points data clustered by assessment ID and event year:**

```sql
SELECT
	p.assessment_id AS assessmentID,
	p.id_no AS taxonID,
	p.year AS year,
	p.event_year AS eventYear,
	p.longitude AS lon,
	p.latitude AS lat
FROM points_data p
CLUSTER BY assessmentid, eventyear;
```

