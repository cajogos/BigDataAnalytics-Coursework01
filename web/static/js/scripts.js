var APP = {
    init: function(rootElement)
    {
        this._element = $(rootElement);

        // Components
        this._yearPicker = new APP.YearPicker(this._element.find('[data-app=year-picker]'), 2000, 2020);
        this._mapDisplay = new APP.MapDisplay(this._element.find('[data-app=map-display]'));
        this._sidebar = new APP.Sidebar(this._element.find('[data-app=sidebar]'));

        // Present the application
        this._element.fadeIn();
    },
    getAPI: function(callback)
    {
        $.getJSON('/api', function(data)
        {
            callback(data);
        });
    }
};

$(document).ready(function()
{
    APP.init($('[data-app=app]'));

    APP.getAPI(function(data)
    {
        console.log(data);
    });
});

// Map Display
APP.MapDisplay = function(element)
{
    this._element = $(element);

    this._element.css('background', 'lightblue');
    this._element.text('MAP GOES HERE');
};
APP.MapDisplay.prototype.constructor = APP.MapDisplay;

// Sidebar
APP.Sidebar = function(element)
{
    this._element = $(element);

    this._element.css('background', 'pink');
    this._element.text('SIDEBAR HERE');
};
APP.Sidebar.prototype.constructor = APP.Sidebar;

// Year Picker
APP.YearPicker = function(element, minValue, maxValue)
{
    this._element = $(element);
    this._rangeEl = $(this._element.find('[data-app=year-range]'));

    this._curValEl = $(this._element.find('[data-app=cur-value]'));
    this._minValEl = $(this._element.find('[data-app=min-value]'));
    this._maxValEl = $(this._element.find('[data-app=max-value]'));

    this.setMinValue(minValue);
    this.setMaxValue(maxValue);

    this.setCurValue(parseInt((this.getMaxValue() + this.getMinValue()) / 2));

    var self = this;
    this._rangeEl.on('input', function(e)
    {
        self._handleInputEvent();
    });
    this._rangeEl.on('change', function(e)
    {
        self._handleChangeEvent();
    });
};
APP.YearPicker.prototype.constructor = APP.YearPicker;

APP.YearPicker.prototype.getCurValue = function()
{
    return this._curValue;
};
APP.YearPicker.prototype.setCurValue = function(value)
{
    this._curValue = parseInt(value, 10);
    this._curValEl.text('Cur: ' + this._curValue);
    this._rangeEl.val(this._curValue);
};

APP.YearPicker.prototype.getMinValue = function(value)
{
    return this._minValue;
};
APP.YearPicker.prototype.setMinValue = function(value)
{
    this._minValue = parseInt(value, 10);
    this._minValEl.text(this._minValue);
    this._rangeEl.attr('min', this._minValue);
};

APP.YearPicker.prototype.getMaxValue = function(value)
{
    return this._maxValue;
};
APP.YearPicker.prototype.setMaxValue = function(value)
{
    this._maxValue = parseInt(value, 10);
    this._maxValEl.text(this._maxValue);
    this._rangeEl.attr('max', this._maxValue);
};

APP.YearPicker.prototype._handleInputEvent = function()
{
    this.setCurValue(this._rangeEl.val());
};

APP.YearPicker.prototype._handleChangeEvent = function()
{
    this.setCurValue(this._rangeEl.val());
};
