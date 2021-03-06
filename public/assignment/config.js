/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'views/home/templates/home.html',
                controller : "homeController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login' , {
                templateUrl : "views/user/templates/login.view.client.html",
                controller : "loginController",
                controllerAs: "model"
            })
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
            .when('/user/:userId/website' , {
                templateUrl : "views/website/templates/website-list.view.client.html",
                controller : "websiteListController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/new' , {
                templateUrl : "views/website/templates/website-new.view.client.html",
                controller : "websiteNewController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid' , {
                templateUrl : "views/website/templates/website-edit.view.client.html",
                controller : "websiteEditController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page' , {
                templateUrl : "views/page/templates/page-list.view.client.html",
                controller : "pageListController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/new' , {
                templateUrl : "views/page/templates/page-new.view.client.html",
                controller : "pageNewController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/:pid' , {
                templateUrl : "views/page/templates/page-edit.view.client.html",
                controller : "pageEditController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/:pid/widget' , {
                templateUrl : "views/widget/templates/widget-list.view.client.html",
                controller : "widgetListController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/:pid/widget/new' , {
                templateUrl : "views/widget/templates/widget-chooser.view.client.html",
                controller : "widgetNewController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/:pid/widget/:wgid/search' , {
                templateUrl : "views/widget/templates/widget-flickr-search.view.client.html",
                controller : "FlickrImageSearchController",
                controllerAs: "model"
            })
            .when('/user/:userId/website/:wid/page/:pid/widget/:wgid' , {
                templateUrl : "views/widget/templates/widget-edit.view.client.html",
                controller : "widgetEditController",
                controllerAs: "model"
            })
    }

    function checkLoggedIn($q, $location, userService) {
        var deffered = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deffered.reject();
                    $location.url("/login")
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
        return deffered.promise;
    }

})();