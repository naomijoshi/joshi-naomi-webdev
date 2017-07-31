/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('MyProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/' , {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            // .when('/home' , {
            //     templateUrl : "views/user/templates/login.view.client.html",
            //     controller : "loginController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser: checkCurrentUser
            //     }
            // })
            .when('/profile' , {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "profileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/register' , {
                templateUrl : "views/user/templates/register.view.client.html",
                controller : "registerController",
                controllerAs: "model"
            })
            .when('/recommend' , {
                templateUrl : "views/user/templates/recommend.view.client.html",
                controller : "recommendController",
                controllerAs: "model"
            })

    }

    function checkLoggedIn($q, $location, userService) {
        var deffered = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deffered.reject();
                    $location.url("/")
                } else {
                    deffered.resolve(currentUser);
                }
            });
        console.log("checklogged",deffered.promise);

        return deffered.promise;
    }

    function checkCurrentUser($q, userService) {
        var deffered = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deffered.resolve({});
                } else {
                    deffered.resolve(currentUser);
                }
            });
        console.log("checkcurret",deffered.promise);
        return deffered.promise;
    }

})();