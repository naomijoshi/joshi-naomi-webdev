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

module.exports = widgetModel;

function createWidget(pageId, widget) {
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
    widgetModel.find({_page : pageId})
        .populate('_page')
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