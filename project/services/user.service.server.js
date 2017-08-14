/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../../server');
var userModel = require('../model/user/user.model.server');
var policyModel = require('../model/policy/policy.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var bcrypt = require("bcrypt-nodejs");
var myReq = require('request');


app.get('/api/project/user', findUserByCredentials);
app.post('/api/project/user', createUser);
app.get('/api/project/checkAdmin',checkAdmin);
app.get('/api/project/user/:userId', findUserById);
app.get('/api/project/users',isAdmin,getAllUsers);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', isAdmin,deleteUser);
app.post ('/api/project/login', passport.authenticate('localproject'), login);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.get('/api/project/unregister', unregister);
app.get   ('/api/project/checkLoggedIn', checkLoggedIn);
app.get ('/auth/project/google', passport.authenticate('googleproject', { scope : ['profile', 'email'] }));
app.post('/api/symptoms', getSymptoms);

app.get('/auth/project/google/callback',
    passport.authenticate('googleproject', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/'
    }));

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET
};

if (process.env.MLAB_USERNAME_WEBDEV) {
    googleConfig.callbackURL = "https://joshi-naomi-webdev.herokuapp.com/auth/project/google/callback"
} else {
    googleConfig.callbackURL = "http://127.0.0.1:3000/auth/project/google/callback"
}
passport.use('localproject',new LocalStrategy(localStrategy));
// passport.use('googleproject',new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function login(req, res) {
    console.log(req.session);
    var user = req.user;
    res.json(user);
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
        next()
    } else {
        res.sendStatus(401);
    }
}
function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    console.log("session in checkedlogin", req.user);
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.json("0");
    }
}


function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
        res.json(req.user);
    } else {
        res.json("0");
    }
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {

                    var newGoogleUser = {
                        firstName: profile.name.givenName,
                        lastName:profile.name.familyName,
                        email: profile.emails[0].value,
                        username: profile.emails[0].value.split('@')[0],
                        google: {
                            id:          profile.id,
                            token:       token
                        },
                        roles:["USER"]
                    };

                    return userModel.createUser(newGoogleUser)

                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username)
        .then(
            function(user) {
                if(user.username === username && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .catch(function (err) {
            return done(null, false);
        });
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            })
        });
}

function unregister(req, res) {

    for(var policy in req.user._policies) {
        policyModel.deletePolicy(req.user._policies[policy]);
    }
    userModel.deleteUser(req.user._id)
        .then(function (data) {
            req.logout(user, function (status) {
                res.sendStatus(200);
            })
        })
}
function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel.findUserByCredentials(username)
        .then(function (user) {
            if(user.username === username) {
                res.json(user);
            } else {
                res.json("Password does not match");
            }
        })
        .catch(function (err) {
            res.status(404).json("user not found")
        })

}

function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function getAllUsers(req,res) {
    userModel.findAllUsers()
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            res.json(err);
        })
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        });
}


function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user)
        .then(function (data) {
            res.json("User successfully updated");
        })
}

function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId)
        .then(function (data) {
            var user = data;
            var policies = user._policies;
            for(var i=0;i<policies.length;i++) {
                policyModel.deletePolicy(policies[i])
                    .then(function (data) {
                        
                    });
            }
            userModel.deleteUser(userId)
                .then(function (data) {
                    res.send("User deleted successfully");
                })
        });
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function getSymptoms(req, res){
    console.log(req.body);

    var options = {
        url: req.body.url,
        headers: {
            'Token': req.body.token
        }
    };
    myReq(options, function(err, result, body){
        res.json(body);
    });


    // var url1 = "https://api.healthgraphic.com/v1/conditions/"+searchText+"/symptoms?page=1&per_page=20";
    // var config1 = {
    //     url: url1,
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'token': token
    //     },
    //     body: ""
    // };
}
