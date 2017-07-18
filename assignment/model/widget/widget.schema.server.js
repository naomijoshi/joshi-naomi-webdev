/**
 * Created by Naomi on 7/16/17.
 */
var mongoose = require("mongoose");
var widgetSchema = mongoose.Schema({
    _page : {type: mongoose.Schema.ObjectId, ref: "PageModel"},
    type : {type: String, require: true, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
    name : String,
    text : String,
    placeholder : String,
    description : String,
    url : String,
    width: String,
    height : String,
    rows: Number,
    size: String,
    class : String,
    icon : String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now()}
}, {collection : 'Widget'});

module.exports = widgetSchema;