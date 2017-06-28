/**
 * Created by Naomi on 6/26/17.
 */
var app = require('../../server');

app.post("/api/page/:pageId/widget", createWidget );
app.get("/api/page/:pageId/widget", findWidgetByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

var widgets =
    [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

function findWidgetById(req, res) {
    var widgetId = req.param("widgetId");
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.json(widget);
}

function findWidgetByPageId(req, res) {
    var pageId = req.param("pageId");
    var resultSet = [];
    for (var w in widgets){
        if(widgets[w].pageId === pageId){
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function createWidget(req, res) {
    var widget = req.body;
    widget["_id"] = new Date().getMilliseconds().toString();
    widgets.push(widget);
    res.json(widget);
}

function updateWidget(req, res) {
    var widgetId = req.param("widgetId");
    var widget = req.body;
    var widgetToUpdate = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    widget["_id"] = widgetToUpdate._id;
    var index = widgets.indexOf(widgetToUpdate);
    widgets[index] = widget;
    res.status(200).json("Widget has been successfully updated");
}

function deleteWidget(req, res) {
    var widgetId = req.param("widgetId");
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index,1);
    res.status(200).json("Widget has been successfully deleted");

}