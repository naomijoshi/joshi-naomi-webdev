/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService)

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


        function findWebsiteById(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });
            if(typeof website === 'undefined')
                return null;
            return website;
        }

        function findWebsitesByUser(userId) {
            var resultSet = [];
            for (var w in websites){
                if(websites[w].developerId === userId){
                    resultSet.push(websites[w]);
                }
            }
            return resultSet;
        }

        function createWebsite(website) {
            website["_id"] = new Date().getMilliseconds().toString();
            websites.push(website);
            return website;
        }
        
        function updateWebsite(websiteId, website) {
            var websiteToUpdate = websites.find(function (website) {
                return website._id === websiteId;
            });
            website["_id"] = websiteToUpdate._id;
            var index = websites.indexOf(websiteToUpdate);
            websites[index] = website;
        }

        function deleteWebsite(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });
            var index = websites.indexOf(website);
            websites.splice(index,1);
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
