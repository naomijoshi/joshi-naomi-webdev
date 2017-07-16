/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../../server');
var pageModel = require("../model/page/page.model.server");

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPageByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

function findPageByWebsiteId(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel.findPageByWebsiteId(websiteId)
        .then(function (pages) {
            res.json(pages);
        })
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params["websiteId"];
    pageModel.createPage(websiteId,page)
        .then(function (data) {
            res.json(data);
        });
}

function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    pageModel.updatePage(pageId, page)
        .then(function (data) {
            res.status(200).json("Page has been successfully updated");
        });
}

function deletePage(req, res) {
    var pageId = req.params["pageId"];
    var websiteId = req.params["websiteId"];
    pageModel.deletePage(websiteId, pageId)
        .then(function (data) {
            res.status(200).json("Page has been successfully deleted");
        })
}