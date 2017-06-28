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

    function pageService($http) {

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createPage(websiteId,page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
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
