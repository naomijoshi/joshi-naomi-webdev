/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService)

    function websiteService($http) {

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" +userId +"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWebsite(userId, website) {
            var url = "/api/user/" +userId +"/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function updateWebsite(websiteId, website) {
            var url = "/api/user/"+ website._user +"/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWebsite(userId, websiteId) {
            var url = "/api/user/"+ userId +"/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        return api = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            deleteWebsite:deleteWebsite,
            updateWebsite:updateWebsite
        };
    }
})();
