/**
 * Created by Naomi on 8/07/17.
 */
var mongoose = require('mongoose');

var policySchema = mongoose.Schema({
    _user : {type: mongoose.Schema.ObjectId, ref : 'UserModel'},
    _product : {type: mongoose.Schema.ObjectId, ref : 'ProductModel'},
    paymentFreq : {type:String, enum:['Monthly','Quarterly','Annually']},
    status: {type:String, enum:['Submitted','In Progress','Approved']},
    dateCreated : {type: Date, default: Date.now()},
    _employee: {type: mongoose.Schema.ObjectId, ref : 'UserModel'}
}, {collection : "Policy"});

module.exports = policySchema;