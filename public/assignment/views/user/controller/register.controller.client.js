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
                    if (!data){
                        if (password === verifyPassword){
                            var user = {
                                username : username,
                                password : password
                            };
                            userService.createUser(user)
                                .then(function (response) {
                                    $location.url("/user/"+response._id);
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