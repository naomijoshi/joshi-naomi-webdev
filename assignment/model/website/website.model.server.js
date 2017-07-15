/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.Model("WebsiteModel", websiteSchema);

module.exports = websiteModel;