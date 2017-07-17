/**
 * Created by Naomi on 6/19/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService)

    function widgetService($http, $routeParams) {

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWidget(pageId,widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(pageId, widgetId) {
            var url = "/api/page/" + pageId+ "/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function sort(start, stop, pageId) {
            var url = "/api/page/"+pageId+"/widget?initial="+start+"&final="+stop;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        return api = {
            createWidget : createWidget,
            findWidgetByPageId : findWidgetByPageId,
            findWidgetById:findWidgetById,
            deleteWidget:deleteWidget,
            updateWidget:updateWidget,
            sort: sort
        };
    }
})();
