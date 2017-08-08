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
app.get('/api/policy/:policyId',findPolicybyId);



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

function findPolicybyId(req, res) {
    var policyId = req.params["policyId"];
    policyModel.findPolicybyId(policyId)
        .then(function (data) {
            res.json(data);
        })
}

function findPoliciesOfUser(req, res) {
    var userId = req.params["userId"];
    policyModel.findPoliciesOfUser(policyId)
        .then(function (data) {
            res.json(data);
        })

}

function findApplicationsOfUser(req, res) {
    var userId = req.params["userId"];
    policyModel.findApplicationsOfUser(policyId)
        .then(function (data) {
            res.json(data);
        })

}