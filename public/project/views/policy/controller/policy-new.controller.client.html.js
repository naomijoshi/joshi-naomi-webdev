/**
 * Created by Naomi on 8/7/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('policyNewController', policyNewController);

    function policyNewController($location, productService, policyService,currentUser) {
        var model = this;
        model.user = currentUser;
        if (currentUser){
            userService.setCurrentUser(currentUser);
        }
        function init() {
            wizardScript();
            productService.getAllProducts()
                .then(function (data) {
                    model.products = data;
                })
        }
        init();
        model.createPolicy = function (policy) {
            policyService.createPolicy(model.user._id,policy)
                .then(function (data) {
                    model.message = "You Application is successfully submitted for approval";
                })
        }
    }
})();