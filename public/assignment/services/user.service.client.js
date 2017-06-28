/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('userService', userService)

    function userService($http) {

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId ;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId ;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;

                }) }

        function deleteUser(userId) {
            var url = "/api/user/" + userId ;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                })
        }

        return api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            deleteUser:deleteUser,
            updateUser:updateUser
        };
    }
})();
