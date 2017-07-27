var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "mysecretofsessionisfoundhereblah double blah" }));
app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;

require("./assignment/app.js");
require("./test/app.js");
require("./project/app.js");