/**
 * Created by Naomi on 8/6/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('dashboardController', dashboardController);

    function dashboardController($location, currentUser, userService, policyService) {
        var model = this;
        model.user = currentUser;
        if(currentUser) {
            userService.setCurrentUser(currentUser);
        }
        function init() {

            findApplicationsOfUser()

            findPoliciesOfUser();

            findAllPolicies();

            findPoliciesOfEmp();
        }
        // $('button[name="remove_levels"]').on('click', function(e) {
        //     // var $form = $(this).closest('form');
        //     e.preventDefault();
        //     $('#confirm').modal({
        //         backdrop: 'static',
        //         keyboard: false,
        //         show: 'true'
        //     })
        //         .one('click', '#delete', function(e) {
        //             $form.trigger('submit');
        //         });
        // });
        // $(document).ready(function () {
        //
        // })

        function findAllPolicies() {
            policyService.findAllApplications()
                .then(function (data) {
                    model.allApplications = data;
                    console.log(model.allApplications);
                })
        }

        function findPoliciesOfUser() {
            policyService.findPoliciesOfUser(model.user._id)
                .then(function (data) {
                    model.policies = data;
                });
        }

        function findApplicationsOfUser() {
            policyService.findApplicationsOfUser(model.user._id)
                .then(function (data) {
                    model.applications = data;

                });
        }

        function findPoliciesOfEmp() {
            policyService.findPoliciesOfEmp(model.user._id)
                .then(function (data) {
                    model.allPolicies = data;
                    console.log(model.allPolicies);
                });
        }

        model.cancelPolicy = function (policyId) {
            if (policyId) {
                console.log(policyId);
                policyService.deletePolicy(policyId)
                    .then(function (data) {
                        findAllPolicies();
                        findPoliciesOfUser();
                        findApplicationsOfUser();
                        findPoliciesOfEmp();
                        $location.url("/dashboard");
                    })
            }
        };

        model.approveApplication = function (app) {
            if(app) {
                app.status="Approved";
                app._employee = model.user._id;
                policyService.updatePolicy(app._id,app)
                    .then(function (data) {
                        findAllPolicies();
                        findPoliciesOfEmp();
                        $location.url("/dashboard");
                    })
            }
        };

        init();
    }
})();