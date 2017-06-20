/**
 * Created by Naomi on 6/19/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService)

    function widgetService() {
        var widgets =
            [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];


        function findWidgetById(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            if(typeof widget === 'undefined')
                return null;
            return widget;
        }

        function findWidgetByPageId(pageId) {
            var resultSet = [];
            for (var w in widgets){
                if(widgets[w].pageId === pageId){
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }

        function createPage(page) {
            page["_id"] = new Date().getMilliseconds().toString();
            pages.push(page);
            return page;
        }

        function updatePage(pageId, page) {
            var pageToUpdate = pages.find(function (page) {
                return page._id === pageId;
            });
            page["_id"] = pageToUpdate._id;
            var index = pages.indexOf(pageToUpdate);
            pages[index] = page;
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }

        return api = {
            createPage : createPage,
            findWidgetByPageId : findWidgetByPageId,
            findWidgetById:findWidgetById,
            deletePage:deletePage,
            updatePage:updatePage
        };
    }
})();
