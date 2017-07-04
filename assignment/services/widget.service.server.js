/**
 * Created by Naomi on 6/26/17.
 */
var app = require('../../server');

var multer = require('multer');
var upload = multer({ dest: __dirname +'/../../public/uploads' });
var fs = require('fs');

app.post("/api/page/:pageId/widget", createWidget );
app.post ("/api/upload", upload.single('myFile'), uploadImage);
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

function renameFile(path, mimetype){
    var ext = mimetype.split('/')[1];
    fs.renameSync(path,path+'.' + ext, function(err) {
        if ( err ) console.log('ERROR in renaming file ' + err);
    });
}

function uploadImage (req, res){
    console.log("body received was" , req.body);
    var widgetId;
    var newWidget = true;
    if(req.body.widgetId === ""){
        widgetId = new Date().getMilliseconds().toString();
    } else {
        widgetId = req.body.widgetId;
        newWidget = false;
    }
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    console.log("MyFile ", myFile);
    renameFile(path, mimetype);
    var widget;
    if(!newWidget) {
        widget = findWidgetById(widgetId);
        widget.url = '/uploads/' + filename+'.'+mimetype.split('/')[1];
    }
    else {
        widget = { "_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": width};
        widget.url = '/uploads/' + filename+'.'+mimetype.split('/')[1];
        widgets.push(widget);
    }

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId +"/widget";
    res.redirect(callbackUrl);
}


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