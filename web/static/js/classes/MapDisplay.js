// Map Display
APP.MapDisplay = function(element)
{
    this._element = $(element);
    this._assessments = [];
    this._polygons = [];

    this._infoWindow = new google.maps.InfoWindow;

    this._initMap();
};
APP.MapDisplay.prototype.constructor = APP.MapDisplay;

APP.MapDisplay.prototype._initMap = function()
{
    this._mapElement = $(this._element.find('[data-app=map]'));
    this._mapElement.css('background', 'grey');
    console.log(this._mapElement);

    var options = {
        center: { lat: 0, lng: 0},
        zoom: 2
    };
    this._map = new google.maps.Map(this._mapElement[0], options);
};

APP.MapDisplay.prototype.setAssessments = function(assessments, callback)
{
    this._assessments = assessments;

    // Process the map polygons
    var polygons = [], points = [], id = '';
    for (var i = 0; i < this._assessments.length; i++)
    {
        if (this._assessments[i]['points'] !== null)
        {
            id = this._assessments[i]['id']
            polygons[id] = {
                id: id,
                name: this._assessments[i]['name'],
                trend: this._assessments[i]['popTrend'],
                year: this._assessments[i]['year'],
                coords: []
            };

            points = this._assessments[i]['points'];
            for (var p = 0; p < points.length; p++)
            {
                polygons[id]['coords'].push({
                    lat: points[p]['lat'],
                    lng: points[p]['lon']
                });
            }
        }
    }
    this._clearPolygons();
    if (polygons.length > 0)
    {
        this._setPolygons(polygons);
    }

    callback();
};

APP.MapDisplay.prototype._setPolygons = function(polygons)
{
    var defaultOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        radius: 50000
    };

    var self = this;

    var options = {};
    for (var id in polygons)
    {
        options = Object.assign({}, defaultOptions);

        var latSum = 0, lngSum = 0;
        var numCoords = polygons[id].coords.length;
        for (var i = 0; i < numCoords; i++)
        {
            latSum += polygons[id].coords[i].lat;
            lngSum += polygons[id].coords[i].lng;
        }
        options.center = {
            lat: latSum / numCoords,
            lng: lngSum / numCoords
        };

        if (polygons[id].trend === 'Increasing')
        {
            options.strokeColor = '#00FF00';
            options.fillColor = '#00FF00';
            options.radius = options.radius * 2;
        }
        if (polygons[id].trend === 'Decreasing')
        {
            options.radius = options.radius * 2;
        }
        else if (polygons[id].trend === 'Stable')
        {
            options.strokeColor = '#0000FF';
            options.fillColor = '#0000FF';
            options.fillOpacity = 0.1;
            options.strokeWeight = 1;
        }

        this._polygons[id] = new google.maps.Circle(options);

        var content = polygons[id];
        this._polygons[id].addListener('click', function (content)
        {
            return function(event) {
                let display = `
                    <h5>${content.name}</h5>
                    <hr />
                    <b>Trend:</b> ${content.trend}<br />
                    <b>Year:</b> ${content.year}
                `;
                self._infoWindow.setContent(display);
                self._infoWindow.setPosition(event.latLng);
                self._infoWindow.open(self._map);
                console.log(event, content);
            }
        }(content));

        this._polygons[id].setMap(this._map);
    }
};

APP.MapDisplay.prototype._clearPolygons = function()
{
    this._infoWindow.close();
    for (var id in this._polygons)
    {
        this._polygons[id].setMap(null);
    }
    this._polygons = [];
};