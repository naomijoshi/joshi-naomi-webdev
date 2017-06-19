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
        model.website = websiteService.findWebsiteById(model.wid);
        model.websites = websiteService.findWebsitesByUser(model.userId);
        model.updateWebsite = function (website) {
            if(website){
                website["developerId"] = model.userId;
                websiteService.updateWebsite(website._id,website);
                $location.url("/user/"+model.userId+"/website");
            }
        }

        model.deleteWebsite = function (websiteId) {
            if (websiteId) {
                websiteService.deleteWebsite(websiteId);
                $location.url("/user/"+model.userId+"/website");
            }
        }
    }
})();