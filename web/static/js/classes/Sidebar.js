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
    console.log(assessments[0]);

    this._loadAssessmentsView(callback);
};

APP.Sidebar.prototype._loadAssessmentsView = function(callback)
{
    var self = this;
    this._listEl.fadeOut(400, function()
    {
        var $el = $(this);
        $el.html('');
        for (var i = 0; i < self._assessments.length; i++)
        {
            var curAssessment = self._assessments[i];

            var listItem = $('<li />');

            var trend = curAssessment.popTrend.toLowerCase();
            listItem.addClass('trend-' + trend);

            var icon = 'fa-horizontal-rule';
            if (trend === 'increasing')
            {
                icon = 'fa-arrow-up';
            }
            else if (trend === 'decreasing')
            {
                icon = 'fa-arrow-down';
            }
            var itemContent = `
                <span class="name">${curAssessment.name}</span>
                <div>
                    <span class="category">${curAssessment.category}</span>
                    <span class="trend-icon"><i class="fas ${icon}"></i></span>
                </div>
            `;
            listItem.html(itemContent);

            $el.append(listItem);
        }

        $el.fadeIn(400, function()
        {
            callback();
        });
    });
};