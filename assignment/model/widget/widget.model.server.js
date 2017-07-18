/**
 * Created by Naomi on 7/16/17.
 */
var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetByPageId=findWidgetByPageId;
widgetModel.updateWidget =updateWidget;
widgetModel.deleteWidget=deleteWidget;
widgetModel.reorderWidget=reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    console.log(widget);
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widget) {
            return pageModel.addWidget(pageId, widget._id);
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function findWidgetByPageId(pageId) {
    return pageModel.findById(pageId)
        .populate('widgets')
        .exec();
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},{$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel.remove({_id:widgetId})
        .then(function (data) {
            return pageModel.removeWidget(pageId, widgetId);
        })
}

function reorderWidget(pageId, start, end) {
    return pageModel.findById(pageId)
        .then(function (page) {
            widgets = page.widgets;
            var widget = widgets.splice(start, 1)[0];
            widgets.splice(end, 0, widget);
            return pageModel.update({_id: pageId}, {$set: {widgets : widgets}});
            // for (w in widgets) {
            //     w.save();
            // }
            // return;
        });
}
