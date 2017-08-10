/**
 * Created by Naomi on 8/6/17.
 */
var app = require('../../server');
var policyModel = require('../model/policy/policy.model.server');
var userModel = require('../model/user/user.model.server');


var passport = require('passport');

app.post('/api/policy', createPolicy);
app.get('/api/policy/user/:userId',findPoliciesOfUser);
app.get('/api/application/user/:userId',findApplicationsOfUser);
app.get('/api/policy/:policyId',findPolicyById);
app.put('/api/policy/:policyId',updatePolicy);
app.delete('/api/policy/:policyId',deletePolicy);



function createPolicy(req,res) {
    var policy = req.body;
    policyModel.createPolicy(policy)
        .then(function (data) {
            userModel.addPolicy(data._user,data._id);
            res.json(data)
        })
        .catch(function (err) {
            res.json(err)
        })
}

function findPolicyById(req, res) {
    var policyId = req.params["policyId"];
    policyModel.findPolicyById(policyId)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
}


function findPoliciesOfUser(req, res) {
    var userId = req.params["userId"];
    policyModel.findPoliciesOfUser(userId)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });

}

function findApplicationsOfUser(req, res) {
    var userId = req.params["userId"];
    policyModel.findApplicationsOfUser(userId)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });

}

function updatePolicy(req, res) {
    var policyId = req.params["policyId"];
    var newPolicy = req.body;
    policyModel.updatePolicy(policyId, newPolicy)
        .then(function () {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });

}

function deletePolicy(req, res) {
    var policyId = req.params["policyId"];
    policyModel.deletePolicy(policyId)
        .then(function () {
            userModel.removePolicy(req.user._id,policyId);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });

}