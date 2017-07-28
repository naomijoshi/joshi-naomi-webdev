/**
 * Created by Naomi on 7/27/17.
 */
/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('MyProject')
        .controller('sharedController', sharedController);

    function sharedController(currentUser, $location, userService) {
        var model = this;
        model.user = currentUser;

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