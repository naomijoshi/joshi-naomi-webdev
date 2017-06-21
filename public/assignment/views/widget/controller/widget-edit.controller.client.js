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
        model.widget = widgetService.findWidgetById(model.wgid);
        model.widgets = widgetService.findWidgetByPageId(model.pid);
        model.updateWidget = function (widget) {
            if(widget){
                // widget["websiteId"] = model.wid;
                console.log(widget);
                widgetService.updateWidget(widget._id,widget);
                $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
            }
        }

        model.deleteWidget = function (widgetId) {
            if (widgetId) {
                widgetService.deleteWidget(widgetId);
                $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
            }
        }

        model.getWidgetEditUrl = function(type){
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.edit.client.html';
        }
    }
})();