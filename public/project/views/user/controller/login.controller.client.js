/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;
        model.login = function (username,password) {
            if(!username || !password) {
                model.message = "Username,password cannot be blank";
                return;
            }
            userService.login(username,password)
                .then(function (data) {
                    if (data) {
                        console.log("user coming back from service", data);
                        $location.url("/dashboard");
                    } else {
                        model.message = "Username "+username+ " not found";
                    }
                }, function (err) {
                    model.message = "Username "+username+ " not found";
                });
        }
    }
})();