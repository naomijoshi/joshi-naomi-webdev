/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('MyProject')
        .factory('userService', userService)

    function userService($http,$rootScope) {

        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            var url = "/api/login";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post("/api/logout")
                .then(function (response) {
                    return response.data;
                });
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

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

        function register(user) {
            var url = "/api/register";
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

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
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
            updateUser:updateUser,
            login:login,
            logout:logout,
            checkLoggedIn:checkLoggedIn,
            register:register,
            setCurrentUser:setCurrentUser
        };
    }
})();
