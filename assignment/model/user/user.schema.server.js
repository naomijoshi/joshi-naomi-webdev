/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : {type: String, require:true},
    password : {type: String, require:true},
    firstName : String,
    lastName : String,
    email : String,
    phone: String,
    _websites: [
        {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}
    ],
    dateCreated : {type: Date, default: Date.now()}
}, {collection : "User"});

module.exports = userSchema;