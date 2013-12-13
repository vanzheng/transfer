(function($) {
    var defaults = {
        target: '',
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
            var _this = $(this);
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

            $.extend(animation, settings.animation);
            settings.beforeStart();
            transfer.animate(settings.animation, settings.duration, function() {
                transfer.remove();
                settings.completed();
            });
        });
    };
})(jQuery)
