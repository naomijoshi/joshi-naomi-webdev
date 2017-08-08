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

function findUserById(userId) {
    return userModel.findById(userId);
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