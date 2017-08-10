/**
 * Created by Naomi on 7/14/17.
 */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    productTitle : {type: String, require:true, enum:["Bronze","Silver","Gold"]},
    premium : {type: Number, require:true},
    productTerm : {type: Number},
    productType : {type: String, enum:["Term Life","Whole Life"]},
    prodDesc : {type: String},
    expiryAge: {type: Number},
    faceAmtMax: Number,
    faceAmtMin: Number,
    coverage: Number,
    dateCreated : {type: Date, default: Date.now()},
}, {collection : "Product"});



module.exports = productSchema;