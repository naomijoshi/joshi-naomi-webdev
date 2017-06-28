/**
 * Created by Naomi on 6/26/17.
 */

var app = require('../../server');

app.get('/api/user', findUserByCredentials);
app.post('/api/user', createUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password) {
        for (var index in users){
            if (username === users[index].username && password === users[index].password){
                res.json(users[index]);
                return;
            }
        }
        res.status(404).json("Credentials not found");
        return
    } else if (username) {
        var user = users.find(function (user) {
            return user.username === username;
        });
        res.json(user);
        return;
    } else {
        res.json(users);
        return;
    }

}

function findUserById(req, res) {
    var userId = req.param("userId");
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function createUser(req, res) {
    var user = req.body;
    user["_id"] = new Date().getMilliseconds().toString();
    users.push(user);
    res.json(user);
}


function updateUser(req, res) {
    var userId = req.param("userId");
    var user = req.body;
    var userToUpdate = users.find(function (user) {
        return user._id === userId;
    });
    user["_id"] = userToUpdate._id;
    var index = users.indexOf(userToUpdate);
    users[index] = user;
    res.json("User successfully updated");
}

function deleteUser(req, res) {
    var userId = req.param("userId");
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index,1);
    res.send("User deleted successfully");
}