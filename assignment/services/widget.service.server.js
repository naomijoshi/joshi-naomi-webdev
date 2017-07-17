/**
 * Created by Naomi on 6/26/17.
 */
var app = require('../../server');

var multer = require('multer');
var upload = multer({ dest: __dirname +'/../../public/uploads' });
var fs = require('fs');
var widgetModel = require("../model/widget/widget.model.server");

app.post("/api/page/:pageId/widget", createWidget );
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.get("/api/page/:pageId/widget", findWidgetByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
app.put("/api/page/:pageId/widget", sortWidget);

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
    if ( !req.file ) {
        res.status(404).json("Please upload an image first");
        return;
    }
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
    renameFile(path, mimetype);
    var widget;
    if(!newWidget) {
        widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        widget.url = '/uploads/' + filename+'.'+mimetype.split('/')[1];
        widget.name = req.body.name;
        widget.text = req.body.text;
    }
    else {
        widget = { "_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": width};
        widget.url = '/uploads/' + filename+'.'+mimetype.split('/')[1];
        widget.name = req.body.name;
        widget.text = req.body.text;
        widgets.push(widget);
    }

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId +"/widget";
    res.redirect(callbackUrl);
}


function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function findWidgetByPageId(req, res) {
    var pageId = req.params["pageId"];
    widgetModel.findWidgetByPageId(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function createWidget(req, res) {
    var widget = req.body;
    widgetModel.createWidget(req.params.pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget)
        .then(function (data) {
            res.status(200).json("Widget has been successfully updated");
        })
}

function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var pageId = req.params["pageId"];
    res.status(200).json("Widget has been successfully deleted");

}

function sortWidget(req, res) {
    var initial = req.query["initial"];
    var final = req.query["final"];
    var pageId = req.params["pageId"];
    if (initial === final) {
        res.status(200).json("Success");
        return;
    }
    widgetModel.reorderWidget(pageId, initial, final)
        .then(function (data) {
            res.status(200).json("Success");
        });
    // var start = -1;
    // for (var w in widgets) {
    //     if (widgets[w].pageId == pageId) {
    //         start += 1;
    //         if (start == initial) {
    //             initial = w;
    //         }
    //         if (start == final) {
    //             final = w;
    //         }
    //     }
    // }


}