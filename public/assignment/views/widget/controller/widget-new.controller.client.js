/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;
        model.wid = $routeParams.wid;
        model.userId = $routeParams.userId;
        model.pid = $routeParams.pid;
        // model.widgets = widgetService.findWidgetByPageId(model.pid);
        model.widgets = ["Heading" , "Html", "Image", "Youtube"];

        model.getWidgetNewUrl = function(type){
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.edit.client.html';
        };

        model.select  = function (widget) {
            model.widgetType = widget.toUpperCase();
        };


        model.createWidget = function (widget) {
            if(widget){
                widget["pageId"] = model.pid;
                widget["widgetType"] = model.widgetType;
                widgetService.createWidget(widget);
                $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
            }
        }
    }
})();