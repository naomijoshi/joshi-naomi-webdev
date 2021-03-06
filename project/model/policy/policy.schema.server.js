/**
 * Created by Naomi on 8/07/17.
 */
var mongoose = require('mongoose');

var policySchema = mongoose.Schema({
    _user : {type: mongoose.Schema.ObjectId, ref : 'CustomerModel'},
    firstName: {type:String, require:true},
    lastName: {type:String, require:true},
    _product : {type: mongoose.Schema.ObjectId, ref : 'ProductModel'},
    paymentFreq : {type:String, enum:['Monthly','Quarterly','Annually']},
    status: {type:String, enum:['Submitted','Approved']},
    dateCreated : {type: Date, default: Date.now()},
    _employee: {type: mongoose.Schema.ObjectId, ref : 'CustomerModel'},
    healthQuestions:{
        arthritis: Boolean,
        blood: Boolean,
        epilepsy: Boolean,
        hepatitis: Boolean,
        Diabetes: Boolean
    }
}, {collection : "Policy"});

module.exports = policySchema;