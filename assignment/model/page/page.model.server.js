/**
 * Created by Naomi on 7/16/17.
 */
var mongoose = require ('mongoose');
var pageSchema = require('./page.schema.server');
var websiteModel = require('../website/website.model.server');
var pageModel = mongoose.model("PageModel" , pageSchema);

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findPageByWebsiteId =findPageByWebsiteId;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page)
        .then(function (page) {
            return websiteModel.addPage(websiteId, page._id);
        })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findPageByWebsiteId(websiteId) {
    return pageModel.find({_website:websiteId})
        .populate('_website')
        .exec();
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        $set: {
            name: page.name,
            description: page.description,
            title: page.title
        }
    })
};

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .removePage(websiteId, pageId);
        });
}
