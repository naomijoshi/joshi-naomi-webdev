/**
 * Created by Naomi on 8/7/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('policyNewController', policyNewController);

    function policyNewController($location,$sce, $routeParams,productService, userService,policyService,currentUser) {
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
                });

            if ($routeParams.policyId) {
                policyService.findPolicyById($routeParams.policyId)
                    .then(function (data) {
                        model.policy = data;
                    });
                model.isUpdate = true;
            }
        }
        init();
        model.createPolicy = function (policy) {
            if (!model.user.gender || !model.user.dob || !model.user.phone || !model.user.address) {
                model.message1 = "You need to complete your profile in order to submit application. Please navigate to Profile"
            } else {
                if (policy._product) {
                    policyService.createPolicy(model.user._id, policy)
                        .then(function (data) {
                            model.message = "You Application is successfully submitted for approval";
                            console.log(data);
                            model.url=data;
                            model.showPdf = true;
                        })
                        .catch(function (err) {
                            model.error = "There was an error processing your request"
                        })
                }
            }

        };


        model.updatePolicy = function (newPolicy) {
            console.log("new policy", newPolicy);
            if (!model.user.gender || !model.user.dob || !model.user.phone || !model.user.address) {
                model.message1 = "You need to complete your profile in order to submit application. Please navigate to Profile"
            } else {
                if (newPolicy) {
                    newPolicy.status = "Submitted";
                    policyService.updatePolicy(newPolicy._id, newPolicy)
                        .then(function (data) {
                            model.message = "Your policy/application ID "+newPolicy._id+ " update has been submitted for approval";
                        })
                        .catch(function (err) {
                            model.error = "There was an error processing your request"
                        })
                }
            }
        };
    }
})();