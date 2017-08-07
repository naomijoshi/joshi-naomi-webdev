/**
 * Created by Naomi on 8/7/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('policyNewController', policyNewController);

    function policyNewController($location, userService, currentUser) {
        var model = this;
        if(currentUser) {
            userService.setCurrentUser(currentUser);
        }
        model.user = currentUser;
        function init() {
            wizardScript();
        }
        init();
        model.createPolicy = function (policy) {
            console.log(policy);
        }
    }
})();