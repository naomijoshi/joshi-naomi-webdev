/**
 * Created by Naomi on 7/14/17.
 */
var policySchema = require("./policy.schema.server");
var mongoose = require('mongoose');
var policyModel = mongoose.model('PolicyModel', policySchema);


module.exports = policyModel;

policyModel.createPolicy = createPolicy;
policyModel.findPolicybyId=findPolicybyId;
policyModel.findPoliciesOfUser=findPoliciesOfUser;
policyModel.findApplicationsOfUser=findApplicationsOfUser;

function createPolicy(policy) {
    return policyModel.create(policy);
}

function findPolicybyId(policyId) {
    return policyModel.findbyId(policyId);
}

function findPoliciesOfUser(userId) {
    return policyModel.find({_user: userId,status:"Approved"});
}

function findApplicationsOfUser(userId) {
    return policyModel.find({_user: userId,status:"Submitted"});
}