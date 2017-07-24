/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser, userService, $location) {
        var model = this;
        model.user = currentUser;
        // console.log(model.currentUser._id);
        model.logout = function logout() {
            console.log("entring");
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    })
        }

        }
})();