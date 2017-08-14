/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    productTitle : {type: String, require:true},
    premium : {type: Number, require:true},
    productTerm : {type: Number},
    prodDesc : {type: String},
    faceAmtMax: Number,
    coverage: Number,
    deductible: Number,
    dateCreated : {type: Date, default: Date.now()}
}, {collection : "Product"});



module.exports = productSchema;