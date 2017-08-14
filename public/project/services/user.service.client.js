/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('MyProject')
        .factory('userService', userService)

    function userService($q, $http,$rootScope) {

        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            var url = "/api/project/login";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post("/api/project/logout")
                .then(function (response) {
                    return response.data;
                });
        }

        function setCurrentUser(user){
            var deffered = $q.defer();
             $rootScope.currentUser = user;
             deffered.resolve(user);
             return deffered.promise;
        }

        function getCurrentUser(){
          return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId ;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/project/register";
            user.roles = "USER";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return err.message;
                })
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId ;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;

                }) }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId ;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                })
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function getAllUsers() {
            var url = "/api/project/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister() {
            var url = '/api/project/unregister';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function getSymptoms(searchText) {
            var url = 'https://api.healthgraphic.com/v1/login.json';
            var config = {
                url: url,
                data: "email=joshi.nao@husky.neu.edu&password=Nainital1206!",
                method: 'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
            }
            };

           return $http(config)
                .then(function (data) {
                    var token = data.data.token;
                    console.log(token);
                    var url1 = "https://api.healthgraphic.com/v1/conditions/"+searchText+"/symptoms?page=1&per_page=20";
                    var params = {
                        url : url1,
                        token : token
                    };

                    return $http.post('/api/symptoms', params)
                        .then(function (data) {
                            return data;
                        })
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
            setCurrentUser:setCurrentUser,
            checkAdmin:checkAdmin,
            getAllUsers:getAllUsers,
            unregister:unregister,
            getSymptoms:getSymptoms
        };
    }
})();
