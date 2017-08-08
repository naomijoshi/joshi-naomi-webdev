/**
 * Created by naomijoshi on 8/7/17.
 */
(function () {
    angular
        .module('MyProject')
        .factory('policyService', policyService)

    function policyService($http,$rootScope) {

        function createPolicy(userId,policy) {
            var url = '/api/policy';
            policy._user = userId;
            policy.status = "Submitted";
            var body = policy;
            return $http.post(url,body)
                .then(function (response) {
                    return response.data;
                })
        }

        function getAllPolicies() {
            var url = "/api/product";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        return api = {
            createPolicy:createPolicy,
            getAllPolicies:getAllPolicies
        }
    }
})();