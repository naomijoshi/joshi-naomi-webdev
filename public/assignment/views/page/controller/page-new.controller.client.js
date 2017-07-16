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
        pageService.findPageByWebsiteId(model.wid)
            .then(function (pages) {
                model.pages = pages;
            });

        model.createPage = function (page) {
            if(page){
                pageService.createPage(model.wid,page)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website/"+model.wid+"/page");
                    });
            }
        }
    }
})();