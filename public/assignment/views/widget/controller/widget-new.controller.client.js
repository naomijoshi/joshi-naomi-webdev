/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;
        model.widgetId = '';
        model.width = '100%';
        model.wid = $routeParams.wid;
        model.userId = $routeParams.userId;
        model.pid = $routeParams.pid;
        model.widgets = ["Heading" , "Html", "Image", "Youtube", "Text"];

        model.getWidgetNewUrl = function(type){
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.edit.client.html';
        };

        model.select  = function (widget) {
            model.widgetType = widget.toUpperCase();
        };


        model.createWidget = function (widget) {
            if(widget){
                if(model.widgetType === "IMAGE" || model.widgetType === "YOUTUBE") {
                    if(!widget["url"]) {
                        model.message = "URL cannot be blank";
                        return;
                    }
                }
                // widget["pageId"] = model.pid;
                widget["type"] = model.widgetType;
                widgetService.createWidget(model.pid, widget)
                    .then(function (data) {
                        $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+"/widget");
                    });
            } else {
                model.message = "Widget cannot be blank";
            }
        }
    }
})();