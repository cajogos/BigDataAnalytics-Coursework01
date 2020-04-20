// Year Picker
APP.YearPicker = function(element)
{
    this._element = $(element);
    this._rangeEl = $(this._element.find('[data-app=year-range]'));

    this._curValEl = $(this._element.find('[data-app=cur-value]'));
    this._minValEl = $(this._element.find('[data-app=min-value]'));
    this._maxValEl = $(this._element.find('[data-app=max-value]'));

    this._listeners = [];

    this.setMinValue(0);
    this.setMaxValue(10);
    this.resetCurValue();

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
APP.YearPicker.prototype.resetCurValue = function()
{
    this.setCurValue(parseInt((this.getMaxValue() + this.getMinValue()) / 2));
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

APP.YearPicker.prototype.addListener = function(listener)
{
    this._listeners.push(listener);
};

APP.YearPicker.prototype.lock = function()
{
    this._rangeEl.prop('disabled', true);
};

APP.YearPicker.prototype.unlock = function()
{
    this._rangeEl.prop('disabled', false);
};

APP.YearPicker.prototype._handleInputEvent = function()
{
    this.setCurValue(this._rangeEl.val());
};

APP.YearPicker.prototype._handleChangeEvent = function()
{
    this.setCurValue(this._rangeEl.val());
    this.lock();
    for (var i = 0; i < this._listeners.length; i++)
    {
        this._listeners[i].fireYearPickerChangeEvent(this.getCurValue());
    }
};
