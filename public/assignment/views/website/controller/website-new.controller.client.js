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
        model.websites = websiteService.findWebsitesByUser(model.userId);
        model.createWebsite = function (website) {
            if(website){
                website["developerId"] = model.userId;
                websiteService.createWebsite(model.userId,website)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website");
                    });
            }
        }
    }
})();