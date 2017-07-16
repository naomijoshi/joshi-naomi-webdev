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
        pageService.findPageById(model.pid)
            .then(function (data) {
                model.page = data;
            });

        pageService.findPageByWebsiteId(model.wid)
            .then(function (data) {
                model.pages = data;
            });

        model.updatePage = function (page) {
            if(page){
                pageService.updatePage(page._id,page)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website/"+model.wid+"/page");
                    });
            }
        }

        model.deletePage = function (pageId) {
            if (pageId) {
                pageService.deletePage(pageId, model.wid)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website/"+model.wid+"/page");
                    });
            }
        }
    }
})();