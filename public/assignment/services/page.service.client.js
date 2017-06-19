/**
 * Created by Naomi on 6/19/17.
 */
/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService)

    function pageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];


        function findPageById(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            if(typeof page === 'undefined')
                return null;
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for (var p in pages){
                if(pages[p].websiteId === websiteId){
                    resultSet.push(pages[p]);
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
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById:findPageById,
            deletePage:deletePage,
            updatePage:updatePage
        };
    }
})();
