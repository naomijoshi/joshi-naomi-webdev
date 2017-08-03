/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../../server');
var userModel = require('../model/user/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");



app.get('/api/user', findUserByCredentials);
app.post('/api/user', createUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.post  ('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get   ('/api/checkLoggedIn', checkLoggedIn);
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET
};

if (process.env.MLAB_USERNAME_WEBDEV) {
    facebookConfig.callbackURL = "https://joshi-naomi-webdev.herokuapp.com/auth/facebook/callback"
} else {
    facebookConfig.callbackURL = "http://127.0.0.1:3000/auth/facebook/callback"
}
passport.use(new LocalStrategy(localStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function login(req, res) {
    console.log(req.session);
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    console.log("reaching here");
    req.logOut();
    res.send(200);
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.json("0");
    }
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username: profile.displayName,
                        firstName: names[0],
                        lastName:  names[1],
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
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
            res.send(user);
        });
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
    userModel.deleteUser(userId)
        .then(function (data) {
            res.send("User deleted successfully");
        })
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

