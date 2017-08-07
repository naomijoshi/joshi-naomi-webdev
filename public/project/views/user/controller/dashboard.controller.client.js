/**
 * Created by Naomi on 8/6/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('dashboardController', dashboardController);

    function dashboardController($location, currentUser, userService) {
        var model = this;
        model.user = currentUser;
        if(currentUser) {
            userService.setCurrentUser(currentUser);
        }

        console.log(model.user);
    }
})();