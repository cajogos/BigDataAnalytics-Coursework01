// Sidebar
APP.Sidebar = function(element)
{
    this._element = $(element);

    this._element.css('background', 'pink');
    this._element.text('SIDEBAR HERE');
};
APP.Sidebar.prototype.constructor = APP.Sidebar;