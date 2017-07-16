/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, websiteService, $routeParams) {

        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        websiteService.findWebsiteById(model.wid)
            .then(function (data) {
                model.website = data;
            });
        websiteService.findWebsitesByUser(model.userId)
            .then(function (data) {
                model.websites = data;
            });

        model.updateWebsite = function (website) {
            if(website){
                websiteService.updateWebsite(website._id,website)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website");
                    });
            }
        };

        model.deleteWebsite = function (websiteId) {
            if (websiteId) {
                websiteService.deleteWebsite(model.userId, websiteId)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website");
                    });
            }
        }
    }
})();