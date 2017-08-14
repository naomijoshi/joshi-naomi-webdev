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
policyModel.findPoliciesOfEmp=findPoliciesOfEmp;
policyModel.findAllApplications=findAllApplications;

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

function findPoliciesOfEmp(empId) {
    return policyModel.find({_employee: empId,status:"Approved"})
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
    console.log("in delete policy model", policyId, typeof policyId);
    return policyModel.remove({_id:policyId});
}

function findAllPolicies(){
     return policyModel.find()
         .populate('_product')
         .exec();

}

function findAllApplications(){
    return policyModel.find({status:"Submitted"})
        .populate('_product')
        .exec();

}