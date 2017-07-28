/**
 * Created by Naomi on 7/27/17.
 */

(function () {
    angular
        .module('MyProject')
        .controller('sharedController', sharedController);

    function sharedController($location, userService, $scope) {
        var model = this;
        $scope.str = "shared controller";
        $scope.logout = function logout() {
            console.log("controller logout");
            userService
                .logout()
                .then(function(response) {
                    userService.setCurrentUser(null);
                        $location.url("/");
                    })
        }

    }
})();