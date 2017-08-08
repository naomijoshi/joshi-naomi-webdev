/**
 * Created by Naomi on 8/7/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('policyNewController', policyNewController);

    function policyNewController($location, productService, userService,policyService,currentUser) {
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
            if (!model.user.gender || !model.user.dob || !model.user.phone || !model.user.address) {
                model.message = "You need to complete your profile in order to submit application. Please navigate to Profile"
            } else {
                if (policy._product) {
                    policyService.createPolicy(model.user._id, policy)
                        .then(function (data) {
                            model.message = "You Application is successfully submitted for approval";
                        })
                }
            }

        }
    }
})();