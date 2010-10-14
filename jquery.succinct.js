(function($) {

    var defaults = {
        limit: 50,
        showCount: true,
        countMarkup: '<em class="remaining">characters remaining: <strong></strong></em>',
        countSelector: 'strong',
        eventNamespace: 'succinct'
    };

    function limitChars(e) {
        var self = $(e.target);
        var count = self.next().find(e.data.countSelector);

        var remaining = e.data.limit - self.val().length;
        if (remaining < 0) {
            self.val(self.val().substr(0, e.data.limit));
            remaining = 0;
        }
        count.text(remaining);
    }

    $.fn.succinct = function(options) {
        var settings = {};

        //create the settings object
        $.extend(true, settings, defaults, options);

        var events = ['change', 'keyup', 'keypress'];

        for (var e in events) {
            events[e] += '.' + settings.eventNamespace
        }

        return $(this).after(settings.countMarkup)
                      .bind(events.join(' '), settings, limitChars)
                      .trigger('change');

    };

})(jQuery);