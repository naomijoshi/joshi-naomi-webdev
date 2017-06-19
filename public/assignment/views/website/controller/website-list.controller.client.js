/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams, websiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websites = websiteService.findWebsitesByUser(model.userId);
    }
})();