/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../../server');
var userModel = require('../model/user/user.model.server');

app.get('/api/user', findUserByCredentials);
app.post('/api/user', createUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel.findUserByCredentials(username, password)
        .then(function (user) {
                res.json(user);
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