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
            if(model.user.roles.indexOf('ADMIN')>-1){
                findAdminApplication();
            }
            if(model.user.roles.indexOf('APPROVER')>-1){
                findAllApplications();
            }

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
            policyService.findAllAdminPolicies()
                .then(function (data) {
                    model.adminPolicies = data;
                    console.log(model.adminPolicies);
                })
        }
        function findAllApplications() {
            policyService.findAllApplications()
                .then(function (data) {
                    model.allApplications = data;
                    console.log(model.allApplications);
                })
        }
        function findAdminApplication() {
            policyService.findAllApplications()
                .then(function (data) {
                    model.adminApplications = data;
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
                        if(model.user.roles == ('ADMIN')){
                            findAdminApplication();
                        }
                        if(model.user.roles == ('APPROVER')){
                            findAllApplications();
                        }
                        findPoliciesOfUser();
                        findApplicationsOfUser();
                        findPoliciesOfEmp();
                        findAllPolicies();
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
                        if(model.user.roles==('ADMIN')){
                            findAdminApplication();
                        }
                        if(model.user.roles==('APPROVER')){
                            findAllApplications();
                        }
                        findPoliciesOfEmp();
                        findAllPolicies();
                        $location.url("/dashboard");
                    })
            }
        };

        init();
    }
})();