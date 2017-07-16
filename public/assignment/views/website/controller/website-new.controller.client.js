/**
 * Created by Naomi on 6/14/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, $location, websiteService) {

        var model = this;
        model.userId = $routeParams["userId"];
        websiteService.findWebsitesByUser(model.userId)
            .then(function (data) {
                model.websites = data;
            });
        model.createWebsite = function (website) {
            if(website){
                websiteService.createWebsite(model.userId,website)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website");
                    });
            }
        }
    }
})();