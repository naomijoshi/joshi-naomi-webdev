/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite =updateWebsite;


module.exports = websiteModel;

function createWebsite(userId, website) {
    console.log("entring model");
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        });
}


function findWebsitesByUser(userId) {
    return websiteModel.find({_user:userId})
        .populate('_user','username')
        .exec();
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .removeWebsite(userId, websiteId);
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {
        $set : {
            name: newWebsite.name,
            description: newWebsite.description,
            _user: newWebsite._user
        }
    });
}