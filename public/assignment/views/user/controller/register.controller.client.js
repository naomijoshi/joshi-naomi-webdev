/**
 * Created by Naomi on 6/14/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = function (username,password,verifyPassword) {

            if(!username || !password || !verifyPassword) {
                model.message = "Username,password cannot be blank";
                return;
            }
            userService.findUserByUsername(username)
                .then(function (data) {
                    console.log("user in registration", data);
                    if (!data){
                        if (password === verifyPassword){
                            var user = {
                                username : username,
                                password : password
                            };
                            userService.register(user)
                                .then(function (response) {
                                    $location.url("/profile");
                                });
                        } else {
                            model.message = "Passwords do not match. Please try again"

                        }
                    } else {
                        model.message = "Username already exists. Please choose another";

                    }
                })
                .catch(function (err) {
                    model.message = "Username already exists. Please choose another";
                });
        }
    }
})();