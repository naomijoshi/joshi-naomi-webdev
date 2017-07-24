/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService) {
        var model = this;
        model.user = currentUser;

        model.update = function (user) {
            if (user){
                userService.updateUser(user._id, user)
                    .then(function (response) {
                        model.message = response;
                    });
            }
        };

        model.delete = function (user) {
            if (user){
                userService.deleteUser(user._id)
                    .then(function (response) {
                        $location.url("/login");
                    });
            }
        };

        model.logout = function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    })
        }

        }
})();