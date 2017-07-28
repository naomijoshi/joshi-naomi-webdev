/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : {type: String, require:true},
    password : {type: String, require:true},
    firstName : String,
    lastName : String,
    email : {type: String, require:true},
    gender: {type: String, enum:['Female', 'Male']},
    phone: String,
    dob: Date,
    address: String,
    dateCreated : {type: Date, default: Date.now()},
    google: {
        id:    String,
        token: String
    }
}, {collection : "User"});



module.exports = userSchema;