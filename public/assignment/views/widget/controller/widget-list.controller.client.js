/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($location, $routeParams, widgetService, $sce) {
        var model = this;
        model.wid = $routeParams.wid;
        model.userId = $routeParams.userId;
        model.pid = $routeParams.pid;
        model.widgets = widgetService.findWidgetByPageId(model.pid);

        model.trustThisContent = function (html) {
           return $sce.trustAsHtml(html);
        }
        
        model.getYoutubeLink = function (youtubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youtubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }
})();