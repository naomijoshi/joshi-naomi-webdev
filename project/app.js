/**
 * Created by naomijoshi on 7/26/17.
 */
var app = require('../server');

require("./services/user.service.server");
require("./services/product.service.server");
require("./services/policy.service.server");


var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://127.0.0.1/insurance_project'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143071.mlab.com:43071/insurance_project'; // user yours
}
mongoose.connect(connectionString);