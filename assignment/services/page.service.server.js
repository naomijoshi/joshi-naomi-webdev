/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../../server');

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPageByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

function findPageById(req, res) {
    var pageId = req.param("pageId");
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    res.json(page);
}

function findPageByWebsiteId(req, res) {
    var websiteId = req.param("websiteId");
    var resultSet = [];
    for (var p in pages){
        if(pages[p].websiteId === websiteId){
            resultSet.push(pages[p]);
        }
    }
     res.json(resultSet);
}

function createPage(req, res) {
    var page = req.body;
    page["_id"] = new Date().getMilliseconds().toString();
    pages.push(page);
    res.json(pages);
}

function updatePage(req, res) {
    var pageId = req.param("pageId");
    var page = req.body;
    var pageToUpdate = pages.find(function (page) {
        return page._id === pageId;
    });
    page["_id"] = pageToUpdate._id;
    var index = pages.indexOf(pageToUpdate);
    pages[index] = page;
    res.status(200).json("Page has been successfully updated");
}

function deletePage(req, res) {
    var pageId = req.param("pageId");
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index,1);
    res.status(200).json("Page has been successfully deleted");
}