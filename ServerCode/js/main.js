(function($) {

    var loginApi = function(elem, options) {
        var ctrl = $(this),
            el = $(elem),
            vars = {},
            settings = $.extend({}, $.fn.api.default, options);

        ctrl.checkElem = function() {
            if (el.length)
                ctrl.setTemplate();
            else
                console.log('404 : The given element does not exist!');
        };

        ctrl.setTemplate = function() {
            var string = '<form id = "signup-form">' +
                '  <label>First Name</label>' +
                '  <input type = "text" name = "firstname" required>' +
                '  <label>Last Name</label>' +
                '  <input type = "text" name = "lastname" required>' +
                '  <label>Username</label>' +
                '  <input type = "text" name = "username" required>' +
                '  <label>Password</label>' +
                '  <input type = "password" name = "password" required>' +
                '  <label>Login</label>' +
                '  <input type="submit" name="login onclick="sendToServer("login")">' +
                '  <label>Register</label>' +
                '  <input type="submit" name="register onclick="sendToServer("register")">' +
                '</form>';


            $(el[0]).append(string);
        };

        ctrl.formValidation = function() {

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.0/jquery.validate.min.js';
            $('body').append(script);

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
            vars.uname = $("input[name*='username']").val();
            vars.password = $("input[name*='password']").val();
        };

        ctrl.hashPassword = function(pass) {
            var password = pass;

            var hashedPassword = password.hashCode();
        };

        ctrl.sendToServer = function(type) {

            if (type.indexOf('login') > 0) {
                $.ajax({
                    url: 'http://172.16.22.233:5000/login',
                    type: 'json',
                    method: 'POST',
                    data: '{"username" : ' + vars.uname + ', "password" : ' + vars.password + '}',
                    success: function(response) {
                        if (response.status == '200') {
                            ctrl.setLoginTemplate();
                        } else {
                            ctrl.finalizeLogin();
                        }
                    }
                });
            } else {
                $.ajax({
                    url: 'http://172.16.22.233:5000/register',
                    type: 'json',
                    method: 'POST',
                    data: '{"username" : ' + vars.uname + ', "password" : ' + vars.password + '}',
                    success: function(response) {
                        if (response.status == '200') {
                            ctrl.setLoginTemplate();
                        } else {
                            ctrl.finalizeLogin();
                        }
                    }
                });
            }
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
