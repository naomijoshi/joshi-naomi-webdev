/**
 * Created by Naomi on 6/14/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, widgetService, $routeParams) {

        var model = this;
        model.userId = $routeParams["userId"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];
        widgetService.findWidgetById(model.wgid)
            .then(function (data) {
                model.widget = data;
                // if (model.widget.rows) {
                //     parseInt(model.widget.rows);
                // }
                model.getWidgetEditUrl = function(type){
                    return 'views/widget/templates/widget-'+type.toLowerCase()+'.edit.client.html';
                }
            });
        widgetService.findWidgetByPageId(model.pid)
            .then(function (data) {
                model.widgets = data;
            });

        model.updateWidget = function (widget) {
            if(widget.name){
                console.log(widget);
                widgetService.updateWidget(widget._id,widget)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
                    });
            } else {
                model.message = "Name cannot be blank";
            }
        };

        model.deleteWidget = function (widgetId) {
            if (widgetId) {
                widgetService.deleteWidget(model.pid, widgetId)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
                    });
            }
        }

    }
})();