/**
 * Created by Naomi on 6/14/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = function (user) {

            if(!user) {
                model.message = "Username,password cannot be blank";
                return;
            }
            userService.findUserByUsername(user.username)
                .then(function (data) {
                    if (!data){
                        if (user.password === user.conPassword){
                            model.user = user;
                            userService.createUser(model.user)
                                .then(function (response) {
                                    $location.url("/profile");
                                });
                        } else {
                            model.message = "Passwords do not match. Please try again"

                        }
                    } else {
                        model.message = "Username already exists. Please choose another";

                    }
                });
        }
    }
})();