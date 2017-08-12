/**
 * Created by Naomi on 08/02/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('homeController', homeController);

    function homeController($location, userService) {
        var model = this;
        // model.user = currentUser;
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
                        userService.setCurrentUser(data)
                            .then(function (data) {
                                $location.url("/dashboard");
                            });
                        console.log("user coming back from service", data);
                    } else {
                        model.message = "Username "+username+ " not found";
                        console.log(model.message);
                    }
                }, function (err) {
                    model.message = "Username "+username+ " not found";
                    console.log(model.message);

                });
        }
    }
})();