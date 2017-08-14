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
            var url = "/api/policy";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPoliciesOfUser(userId) {
            var url = "/api/policy/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPoliciesOfEmp(userId) {
            var url = "/api/policy/employee/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findApplicationsOfUser(userId) {
            var url = "/api/application/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPolicyById(policyId) {
            var url = '/api/policy/'+policyId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePolicy(policyId, policy) {
            var url = '/api/policy/'+policyId;
            var body = policy;
            return $http.put(url,body)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePolicy(policyId) {
            var url = '/api/policy/'+policyId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllPolicies() {
            var url = '/api/policies';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllApplications() {
            var url = '/api/application';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        return api = {
            createPolicy:createPolicy,
            getAllPolicies:getAllPolicies,
            findPoliciesOfUser:findPoliciesOfUser,
            findApplicationsOfUser:findApplicationsOfUser,
            findPolicyById:findPolicyById,
            updatePolicy:updatePolicy,
            deletePolicy:deletePolicy,
            findAllPolicies:findAllPolicies,
            findPoliciesOfEmp:findPoliciesOfEmp,
            findAllApplications:findAllApplications
        }
    }
})();