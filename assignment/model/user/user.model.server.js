/**
 * Created by Naomi on 7/14/17.
 */
var userSchema = require("./user.schema.server");
var mongoose = require('mongoose');
var userModel = mongoose.model('UserModel', userSchema);


module.exports = userModel;

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(username, password) {
    if (username && password) {
        return userModel.findOne({username: username, password: password});
    }

    if (username) {
        return userModel.findOne({username: username});
    }
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}