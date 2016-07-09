(function($) {
        'use strict';
        var loginApi = function(elem, options) {
            var ctrl = $(this),
                el = $(elem);
            settings = $.extend({}, $.fn.api.default, options);

            ctrl.checkElem = function() {
            	try {
            		if(el.length)
            			setTemplate();
            	}
            	catch {
            		console.log(err.message);
            	}
            };

            ctrl.setTemplate = function() {

            };

            ctrl.getFormVal = function() {

            };

            ctrl.hashPassword = function() {
                var password = elem.find('input');

                var hashedPassword = password.hashCode();
            };

            ctrl.sendToServer = function(){

            	$.ajax({
            		url : 'http://192.168.x.x/api/login',
            		success: function(response){
            			if(response.status == '100'){
            				loginApi.setLoginTemplate();
            			}
            			else {
            				loginApi.finalizeLogin();
            			}
            		}
            	});
            };
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
