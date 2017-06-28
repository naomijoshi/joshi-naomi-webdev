/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams.userId;
        userService.findUserById(userId)
            .then(function (data) {
                model.user = data;
            });

        model.update = function (user) {
            if (user){
                userService.updateUser(user._id, user)
                    .then(function (response) {
                        model.message = response;
                    });
            }
        }

        model.delete = function (user) {
            if (user){
                userService.deleteUser(user._id)
                    .then(function (response) {
                        $location.url("/login");
                    });
            }
        }
    }
})()