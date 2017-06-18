/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = function (username,password) {
            var user = userService.findUserByCredentials(username,password);
            console.log("user coming back from service", user);
            if (user){
                $location.url("/user/"+user._id);
            } else {
                model.message = "Username "+username+ " not found";
            }

            // var x = {username: "bob",      password: "bob",firstName: "Bobby",    lastName: "Marley"  }
            // userService.updateUser(user._id, x);
        }
    }
})();