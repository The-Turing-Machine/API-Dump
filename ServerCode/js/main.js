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
              var string =  '<form id = "signup-form">' +
                  '  <label>First Name</label>' +
                  '  <input type = "text" name = "First Name" required></input>' +
                  '  <label>Last Name</label>'+
                  '  <input type = "text" name = "Last Name" required></input>'+
                  '  <label>Username</label>'+
                  '  <input type = "text" name = "Username" required></input>'+
                  '  <label>Password</label>'+
                  '  <input type = "password" name = "Password" required></input>'+
                  '</form>'


              $('').append(string);

            };

            ctrl.formValidation = function()
{
   // Setup form validation on the #register-form element
   $("#signup-form").validate({

     // Specify the validation rules
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

     // Specify the validation error messages
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