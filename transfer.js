(function($) {
    var defaults = {
        target: null,
        transferClass: '',
        animation: {},
        duration: 500,
        beforeStart: function() {},
        completed: function() {}
    };
    $.fn.transfer = function(opts) {
        var settings = $.extend({}, defaults, opts);

        return this.each(function() {
            var target = $(settings.target);
            var targetPosition = target.offset();
            var animation = {
                top: targetPosition.top,
                left: targetPosition.left,
                height: target.innerHeight(),
                width: target.innerWidth()
            };

            $.extend(animation, settings.animation);

            var _this = $(_this);
            var thisPosition = _this.offset();
            var transfer = $('<div class="effect-transfer"></div>')
                .appendTo(document.body)
                .addClass(settings.transferClass)
                .css({
                    top: thisPosition.top,
                    left: thisPosition.left,
                    height: _this.innerHeight(),
                    width: _this.innerWidth(),
                    position: 'absolute'
                });

            settings.beforeStart();
            transfer.animate(settings.animation, settings.duration, function() {
                transfer.remove();
                settings.completed();
            });
        });
    };
})(jQuery)
