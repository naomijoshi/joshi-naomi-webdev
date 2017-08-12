/**
 * Created by Naomi on 7/14/17.
 */
var policySchema = require("./policy.schema.server");
var mongoose = require('mongoose');
var policyModel = mongoose.model('PolicyModel', policySchema);


module.exports = policyModel;

policyModel.createPolicy = createPolicy;
policyModel.findPolicyById=findPolicyById;
policyModel.findPoliciesOfUser=findPoliciesOfUser;
policyModel.findApplicationsOfUser=findApplicationsOfUser;
policyModel.updatePolicy = updatePolicy;
policyModel.deletePolicy=deletePolicy;
policyModel.findAllPolicies=findAllPolicies;

function createPolicy(policy) {
    return policyModel.create(policy);
}

function findPolicyById(policyId) {
    return policyModel.findById(policyId);
}

function findPoliciesOfUser(userId) {
    return policyModel.find({_user: userId,status:"Approved"})
        .populate('_product')
        .exec();
}

function findApplicationsOfUser(userId) {
    return policyModel.find({_user: userId,status:"Submitted"})
        .populate('_product')
        .exec();
}

function updatePolicy(policyId, newPolicy) {
    return policyModel.update({_id:policyId},{$set:newPolicy});
}

function deletePolicy(policyId) {
    return policyModel.remove({_id:policyId});
}

function findAllPolicies(){
     return policyModel.find();

}