// Sidebar
APP.Sidebar = function(element)
{
    this._element = $(element);

    // List element
    this._listEl = $(this._element.find('.sidebar-list'));
    this._element.append(this._listEl);

    this._assessments = [];
};
APP.Sidebar.prototype.constructor = APP.Sidebar;

APP.Sidebar.prototype.setAssessments = function(assessments, callback)
{
    this._assessments = assessments;
    this._loadAssessmentsView(callback);
};

APP.Sidebar.prototype._loadAssessmentsView = function(callback)
{
    var self = this;
    this._listEl.fadeOut(400, function()
    {
        var $el = $(this);
        $el.html('');
        var html = '';
        for (var i = 0; i < self._assessments.length; i++)
        {
            var curAssessment = self._assessments[i];
            var trend = curAssessment.popTrend.toLowerCase();

            var icon = 'fa-horizontal-rule';
            if (trend === 'increasing')
            {
                icon = 'fa-arrow-up';
            }
            else if (trend === 'decreasing')
            {
                icon = 'fa-arrow-down';
            }
            html += `
            <li class="trend-${trend}">
                <span class="name">${curAssessment.name}</span>
                <div>
                    <span class="category">${curAssessment.category}</span>
                    <span class="trend-icon"><i class="fas ${icon}"></i></span>
                </div>
            </li>
            `;
        }
        $el.html(html);

        $el.fadeIn(400, function()
        {
            callback();
        });
    });
};