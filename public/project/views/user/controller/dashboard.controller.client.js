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
            policyService.findPoliciesOfUser(model.user._id)
                .then(function (data) {
                    model.policies = data;
                });

            policyService.findApplicationsOfUser(model.user._id)
                .then(function (data) {
                    model.applications = data;

                })
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

        model.cancelPolicy = function (policyId) {
            if (policyId) {
                console.log(policyId);
                policyService.deletePolicy(policyId)
                    .then(function (data) {
                        model.message = "Your policy/application has been successfully terminated";
                    })
            }
        };
        init();
    }
})();