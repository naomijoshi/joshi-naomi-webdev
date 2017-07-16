/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../server');

    require("./services/user.service.server.js");
    require("./services/website.service.server.js");
    require("./services/page.service.server.js");
    require("./services/widget.service.server.js");

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/webdev_summer1_2017'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143071.mlab.com:43071/heroku_8d6bn1tt'; // user yours
}
mongoose.connect(connectionString);
