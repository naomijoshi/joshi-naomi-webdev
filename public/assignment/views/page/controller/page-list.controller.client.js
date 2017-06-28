/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, pageService) {
        var model = this;
        model.wid = $routeParams.wid;
        model.userId = $routeParams.userId;
        pageService.findPageByWebsiteId(model.wid)
            .then(function (data) {
                model.pages = data;
            });
    }
})();