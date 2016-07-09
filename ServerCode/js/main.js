(function($) {
    var loginApi = function(elem, options) {
        var ctrl = $(this),
            el = $(elem),
            vars = {},
            settings = $.extend({}, $.fn.api.default, options);

        ctrl.checkElem = function() {
            if (el.length)
                ctrl.setTemplate();
        };

        ctrl.setTemplate = function() {
            var string = '<form id = "signup-form">' +
                '  <label>First Name</label>' +
                '  <input type = "text" name = "firstname" required></input>' +
                '  <label>Last Name</label>' +
                '  <input type = "text" name = "lastname" required></input>' +
                '  <label>Username</label>' +
                '  <input type = "text" name = "username" required></input>' +
                '  <label>Password</label>' +
                '  <input type = "password" name = "password" required></input>' +
                '</form>';


            $(el[0]).append(string);
        };

        ctrl.formValidation = function() {

            $("#signup-form").validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    agree: "required"
                },
                messages: {
                    firstname: "Please enter your first name",
                    lastname: "Please enter your last name",
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    email: "Please enter a valid email address",
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });

        };

        ctrl.getFormVal = function() {
            vars.fname = $("input[name*='firstname']").val();
            vars.lname = $("input[name*='lastname']").val();
            vars.uname = $("input[name*='username']").vale();
            vars.password = $("input[name*='password']").val();
        };

        ctrl.hashPassword = function(pass) {
            var password = pass;

            var hashedPassword = password.hashCode();
        };

        ctrl.sendToServer = function() {

            $.ajax({
                url: 'http://192.168.x.x/api/login',
                success: function(response) {
                    if (response.status == '100') {
                        loginApi.setLoginTemplate();
                    } else {
                        loginApi.finalizeLogin();
                    }
                }
            });
        };

        ctrl.init = function() {
            ctrl.checkElem();
        }
        return ctrl.init();
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

    $.fn.api.default = {

    };

})(jQuery);
