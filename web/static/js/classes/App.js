var APP = {};

APP.init = function(rootElement)
{
    // Get element and hide application
    this._element = $(rootElement);
    this._element.hide();

    this._stateEl = $(this._element.find('[data-app=app-state]'));
    this._stateEl.css('visibility', 'hidden');

    this._curYearEl = $(this._element.find('[data-app=cur-year]'));
    this._numAssessmentsEl = $(this._element.find('[data-app=num-assessments]'));

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

APP.setCurrentYear = function(year)
{
    this._curYearEl.text(year);
};

APP.setAssessments = function(assessments, callback)
{
    this._assessments = assessments;
    this._numAssessmentsEl.text(this._assessments.length);

    var self = this;
    this._sidebar.setAssessments(this._assessments, function()
    {
        self._mapDisplay.setAssessments(self._assessments, callback);
    });
};

APP.setLoadingState = function(isLoading)
{
    this._loadingState = isLoading;
    if (this.isLoading())
    {
        this._stateEl.css('visibility', 'initial');
        // Lock the application
        this._yearPicker.lock();
    }
    else
    {
        this._stateEl.css('visibility', 'hidden');
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
        this.setCurrentYear(year);
        this.setAssessments([], function()
        {
            APP.setLoadingState(false);
        });
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
    this.setCurrentYear(data.year);
    this.setAssessments(data.assessments, function()
    {
        APP.setLoadingState(false);
    });
};
