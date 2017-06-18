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

            var user = userService.findUserByUsername(username);
            if (user){
                model.message = "Username already exists. Please choose another"
            } else {
                if (password === verifyPassword){
                    var user = {
                        username : username,
                        password : password
                    };
                    var createdUser = userService.createUser(user);
                    $location.url("/user/"+createdUser._id);
                } else {
                    model.message = "Passwords do not match. Please try again"

                }
            }
        }
    }
})();