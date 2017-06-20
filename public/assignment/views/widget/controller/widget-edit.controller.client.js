/**
 * Created by Naomi on 6/14/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, pageService, $routeParams) {

        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.page = pageService.findPageById(model.pid);
        model.pages = pageService.findPageByWebsiteId(model.wid);
        model.updatePage = function (page) {
            if(page){
                page["websiteId"] = model.wid;
                pageService.updatePage(page._id,page);
                $location.url("/user/"+model.userId+"/website/"+model.wid+"/page");
            }
        }

        model.deletePage = function (pageId) {
            if (pageId) {
                pageService.deletePage(pageId);
                $location.url("/user/"+model.userId+"/website/"+model.wid+"/page");
            }
        }
    }
})();