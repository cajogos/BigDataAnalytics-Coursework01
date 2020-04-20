var APP = {};

APP.init = function(rootElement)
{
    // Get element and hide application
    this._element = $(rootElement);
    this._element.hide();

    // Components
    this._yearPicker = new APP.YearPicker(this._element.find('[data-app=year-picker]'));
    this._mapDisplay = new APP.MapDisplay(this._element.find('[data-app=map-display]'));
    this._sidebar = new APP.Sidebar(this._element.find('[data-app=sidebar]'));

    this._yearPicker.addListener(this);

    this.fireYearPickerChangeEvent = function(curValue)
    {
        APP.fireLoadYear(curValue);
    };

    // Data
    this._years = [];
    this._assessments = [];

    // Flags
    this._loadingState = false;
};

APP.boot = function()
{
    APP.getIndexData(function(data)
    {
        APP.loadIndexData(data);
    });
};

APP.getIndexData = function(callback)
{
    $.getJSON('/api/index', function(data)
    {
        callback(data);
    });
};

APP.loadIndexData = function(data)
{
    APP.setYears(data.years);
    this._element.fadeIn();

    APP.fireLoadYear(this._yearPicker.getCurValue());
};

APP.setYears = function(years)
{
    this._years = years;

    var minYear = Math.min(...years);
    var maxYear = Math.max(...years);
    this._yearPicker.setMinValue(minYear);
    this._yearPicker.setMaxValue(maxYear);
    this._yearPicker.resetCurValue();
};

APP.setAssessments = function(assessments)
{
    console.log(assessments);
    this._assessments = assessments;
};

APP.setLoadingState = function(isLoading)
{
    this._loadingState = isLoading;
    if (this.isLoading())
    {
        // Lock the application
        this._yearPicker.lock();
    }
    else
    {
        // Unlock the application
        this._yearPicker.unlock();
    }
};

APP.isLoading = function()
{
    return this._loadingState;
};

APP.fireLoadYear = function(year)
{
    // Check year exists
    if (this._years.indexOf(year) === -1)
    {
        // TODO: Years with nothing
        console.log('nothing for year '+ year);
        this.setAssessments([]);
        return false;
    }

    if (!APP.isLoading())
    {
        APP.setLoadingState(true);
        // Do JSON request
        $.getJSON('/api/year/' + year, function(data)
        {
            APP.loadYear(data);
        });
    }
};

APP.loadYear = function(data)
{
    this.setAssessments(data.assessments);
    APP.setLoadingState(false);
};