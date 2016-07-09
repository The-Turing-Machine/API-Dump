(function($) {
        'use strict';
        var loginApi = function(elem, options) {
            var ctrl = $(this),
                el = $(elem);
            settings = $.extend({}, $.fn.api.default, options);

            ctrl.checkElem = function() {

            };

            ctrl.setTemplate = function() {

            };

            ctrl.getFormVal = function() {

            };

            ctrl.hashPassword = function() {
                var password = elem.find('input');

                var hashedPassword =
            }
        };

        String.prototype.hashCode = function() {
            var hash = 0,
               	i,
               	chr,
               	len;

            if (this.length === 0) return hash;
            for (i = 0, len = this.length; i < len; i++) {
                chr = this.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        };

        $.fn.api = function(options) {
            return this.each(function() {
                var apis = new loginApi($(this), options);
            });
        };

        $fn.api.default = {

        };

    }

})(jQuery);
