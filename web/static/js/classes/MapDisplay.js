// Map Display
APP.MapDisplay = function(element)
{
    this._element = $(element);

    this._element.css('background', 'lightblue');
    this._element.text('MAP GOES HERE');
};
APP.MapDisplay.prototype.constructor = APP.MapDisplay;