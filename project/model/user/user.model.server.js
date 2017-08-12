/**
 * Created by Naomi on 7/14/17.
 */
var userSchema = require("./user.schema.server");
var mongoose = require('mongoose');
var userModel = mongoose.model('CustomerModel', userSchema);


module.exports = userModel;

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addPolicy = addPolicy;
userModel.removePolicy = removePolicy;
userModel.findUserByFacebookId=findUserByFacebookId;
userModel.findAllUsers=findAllUsers;
userModel.findUserByGoogleId=findUserByGoogleId;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(username) {
    if (username) {
        return userModel.findOne({username: username});
    }
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        $set : newUser
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function removePolicy(userId, policyId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            console.log("in remove policy",userId,policyId);
            var index = user._policies.indexOf(policyId);
            user._policies.splice(index, 1);
            return user.save();
        });
}

function addPolicy(userId, policyId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._policies.push(policyId);
            return user.save();
        })
}