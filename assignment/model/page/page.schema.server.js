/**
 * Created by Naomi on 7/16/17.
 */
var mongoose = require ('mongoose');
var pageSchema = mongoose.Schema({
    _website : {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name : {type : String, require : true},
    description : {type: String},
    title: String,
    dateCreated : {type: Date, default: Date.now()}
}, {collection: 'Page'});

module.exports = pageSchema;