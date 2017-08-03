/**
 * Created by Naomi on 08/02/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('homeController', homeController);

    function homeController($location, userService, currentUser) {
        var model = this;
        model.user = currentUser;
        // if(model.user) {
        //     userService.setCurrentUser(model.user);
        // }
        model.login = function (username,password) {
            if(!username || !password) {
                model.message = "Username,password cannot be blank";
                return;
            }
            userService.login(username,password)
                .then(function (data) {
                    if (data) {
                        console.log("user coming back from service", data);
                        $location.url("/profile");
                    } else {
                        model.message = "Username "+username+ " not found";
                    }
                }, function (err) {
                    model.message = "Username "+username+ " not found";
                });
        }
    }
})();