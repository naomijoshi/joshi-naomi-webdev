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
        model.user = userService.findUserById(userId);
    }
})()