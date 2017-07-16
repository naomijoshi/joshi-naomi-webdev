/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user : {type: mongoose.Schema.ObjectId, ref : 'UserModel'},
    name : {type : String, require : true},
    description : {type: String},
    dateCreated : {type: Date, default: Date.now()},
    pages :[{type:mongoose.Schema.Types.ObjectId, ref: 'PageModel'}]
    }, {collection : "Website"});

module.exports = websiteSchema;