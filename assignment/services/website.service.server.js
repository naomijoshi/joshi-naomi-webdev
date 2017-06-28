/**
 * Created by Naomi on 6/26/17.
 */
var app = require('../../server');

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findWebsitesByUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findWebsiteById(req, res) {
    var websiteId = req.param("websiteId");
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.json(website);
}

function findWebsitesByUser(req, res) {
    var userId = req.param("userId");
    var resultSet = [];
    for (var w in websites){
        if(websites[w].developerId === userId){
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function createWebsite(req, res) {
    var website = req.body;
    website["_id"] = new Date().getMilliseconds().toString();
    websites.push(website);
    res.json(website);
}

function updateWebsite(req, res) {
    var websiteId = req.param("websiteId");
    var website = req.body;
    var websiteToUpdate = websites.find(function (website) {
        return website._id === websiteId;
    });
    website["_id"] = websiteToUpdate._id;
    var index = websites.indexOf(websiteToUpdate);
    websites[index] = website;
    res.status(200).json("Website Successfully updated");
}

function deleteWebsite(req, res) {
    var websiteId = req.param("websiteId");
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index,1);
    res.status(200).json("Website Successfully deleted");

}
