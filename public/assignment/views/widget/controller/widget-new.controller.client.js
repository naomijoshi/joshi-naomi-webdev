/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {
        var model = this;
        model.wid = $routeParams.wid;
        model.userId = $routeParams.userId;
        model.pages = pageService.findPageByWebsiteId(model.wid);

        model.createPage = function (page) {
            if(page){
                page["websiteId"] = model.wid;
                pageService.createPage(page);
                $location.url("/user/"+model.userId+"/website/"+model.wid+"/page");
            }
        }
    }
})();