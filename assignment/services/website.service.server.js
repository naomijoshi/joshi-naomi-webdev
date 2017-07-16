/**
 * Created by Naomi on 6/26/17.
 */
var app = require('../../server');
var websiteModel = require('../model/website/website.model.server');

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findWebsitesByUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);


function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
}

function findWebsitesByUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findWebsitesByUser(userId)
        .then(function (data) {
            res.json(data);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    websiteModel.createWebsite(req.params.userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website)
        .then(function (data) {
            res.status(200).json("Website Successfully updated");
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(req.params.userId, websiteId)
        .then(function (data) {
            res.status(200).json("Website Successfully deleted");
        });

}
