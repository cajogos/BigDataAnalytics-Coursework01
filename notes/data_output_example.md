Data should be like this at the end:

```json
{
    "2019": {
        "assessments": [
            {
                "id": "497499",
                "taxonID": "132523146",
                "pubYear": 2019,
                "year": 2018,
                "scientificName": "Hubbsina turneri",
                "kingdomName": "ANIMALIA",
                "category": "Critically Endangered",
                "populationTrend": "Decreasing",
                "points": [
                    { "eventYear": 2014, "lon": -101.4795, "lat": 19.8745 },
                    { "eventYear": 2014, "lon": -101.7773, "lat": 19.8256 },
                    { "eventYear": 2015, "lon": -101.7876, "lat": 19.8273 }
                ]
            },
            {
                "id": "497499",
                "taxonID": "132523146",
                "pubYear": 2019,
                "scientificName": "Hubbsina turneri",
                "kingdomName": "ANIMALIA",
                "category": "Critically Endangered",
                "date": "2018-04-17 00:00:00 UTC",
                "populationTrend": "Decreasing",
                "points": [
                    { "eventYear": 2014, "lon": -101.4795, "lat": 19.8745 },
                    { "eventYear": 2014, "lon": -101.7773, "lat": 19.8256 },
                    { "eventYear": 2015, "lon": -101.7876, "lat": 19.8273 }
                ]
            },
            ...
        ]
    },
    "2018": {
    	"assessements": []
    }
}
```

