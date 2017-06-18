/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('WAM',['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'home.html'
            })
            .when('/login' , {
                templateUrl : "views/user/templates/login.view.client.html",
                controller : "loginController",
                controllerAs: "model"
            })
            .when('/user/:userId' , {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "profileController",
                controllerAs: "model"
            })
            .when('/register' , {
                templateUrl : "views/user/templates/register.view.client.html",
                controller : "registerController",
                controllerAs: "model"
            })
    }

})();