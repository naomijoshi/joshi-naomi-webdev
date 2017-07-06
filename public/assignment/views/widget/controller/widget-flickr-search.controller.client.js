/**
 * Created by Naomi on 6/14/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($location, flickrService, widgetService, $routeParams) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];

        model.searchPhotos = function(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        };

        model.selectPhoto = function (photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                _id : model.wgid,
                pageId : model.pid,
                widgetType : 'IMAGE',
                url : url,
                width : '100%'
            }
            widgetService
                .updateWidget(model.wgid, widget)
                .then(function (data) {
                    $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
                });
        };

    }
})();
