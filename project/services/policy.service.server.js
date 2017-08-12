/**
 * Created by Naomi on 8/6/17.
 */
var app = require('../../server');
var policyModel = require('../model/policy/policy.model.server');
var userModel = require('../model/user/user.model.server');
var docusign = require('docusign-esign');
var async = require('async');
var request = require('request');
var bodyParser = require("body-parser");
var getAge = require('get-age');
var productModel = require('../model/product/product.model.server');

var passport = require('passport');

app.post('/api/policy', createPolicy);
app.get('/api/policy/user/:userId',findPoliciesOfUser);
app.get('/api/application/user/:userId',findApplicationsOfUser);
app.get('/api/policy/:policyId',findPolicyById);
app.put('/api/policy/:policyId',updatePolicy);
app.delete('/api/policy/:policyId',deletePolicy);



function initiateDocusign(data, session, resParent){
    session = session.passport;
    productModel.findProductById(data._product)
        .then(function(prod){
	        console.log('The product is ', prod);
	        var integratorKey = 'cfdff8fb-9578-4a6d-a3ef-546d17780142';
	        var email = 'joshi.nao@husky.neu.edu';
	        var password = 'nainital';
	        var obj = {
		        "Username" : email,
		        "Password" : password,
		        "IntegratorKey" : integratorKey
	        };
	        var params = {
		        url : "https://demo.docusign.net/restapi/v2/login_information",
		        headers : {
			        "X-DocuSign-Authentication" : JSON.stringify(obj)
		        }
	        };
	        return request.get(params, function(err, res, body){
		        var baseUrl = JSON.parse(body).loginAccounts[0].baseUrl;
		        var paramsForEmbeddedSign = {
			        "status": "sent",
			        "emailSubject": "Web Dev Project : ALPHA INSURANCE COMPANY : Signature Required",
			        "documents": [{
				        "documentId": "1",
				        "name": "Application.pdf",
				        "documentBase64": "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MDAwMCBuIAowMDAwMDA3NTAzIDAwMDAwIG4gCjAwMDAwMDE4NjIgMDAwMDAgbiAKMDAwMDAwNDU3NyAwMDAwMCBuIAowMDAwMDA0NzE3IDAwMDAwIG4gCjAwMDAwMDUzOTEgMDAwMDAgbiAKMDAwMDAwNDk4NyAwMDAwMCBuIAowMDAwMDA1MzcxIDAwMDAwIG4gCjAwMDAwMDU2MzIgMDAwMDAgbiAKMDAwMDAwNzQ4MiAwMDAwMCBuIAowMDAwMDA4MzY2IDAwMDAwIG4gCjAwMDAwMDc4MTQgMDAwMDAgbiAKMDAwMDAwODM0NiAwMDAwMCBuIAowMDAwMDA4NjAyIDAwMDAwIG4gCjAwMDAwMTI5MTEgMDAwMDAgbiAKMDAwMDAxMjkzMiAwMDAwMCBuIAowMDAwMDEyOTc3IDAwMDAwIG4gCjAwMDAwMTMwMzAgMDAwMDAgbiAKMDAwMDAxMzA1MyAwMDAwMCBuIAowMDAwMDEzMDk1IDAwMDAwIG4gCjAwMDAwMTMxMTQgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAzMSAvUm9vdCAxNCAwIFIgL0luZm8gMSAwIFIgL0lEIFsgPGJjMTdhM2RhMjAyYzA5MTY1NGViN2NjOTUxYmJhODBiPgo8YmMxN2EzZGEyMDJjMDkxNjU0ZWI3Y2M5NTFiYmE4MGI+IF0gPj4Kc3RhcnR4cmVmCjEzMjc4CiUlRU9GCg==",
			        }],
			        "recipients": {
				        "signers": [{
					        "email": session.user.email,
					        "name": session.user.firstName + " " + session.user.lastName,
					        "recipientId": "1",
					        "clientUserId": "1234",
					        "tabs": {
						        "dateSignedTabs": [
							        {
								        "anchorString": "Date",
								        "anchorXOffset": "40",
								        "anchorYOffset" : "-5",
								        "fontSize": "Size12",
								        "name": "Date Signed",
								        "tabLabel": "date_signed"
							        }],
						        "fullNameTabs": [{
							        "anchorString": "Name",
							        "anchorYOffset": "-5",
							        "anchorXOffset": "50",
							        "fontSize": "Size12"
						        }],
						        "textTabs": [{
							        "anchorString": "Email",
							        "anchorYOffset": "-8",
							        "anchorXOffset" : "45",
							        "fontSize": "Size12",
							        "value" : session.user.email // TODO
						        },
							        {
								        "anchorString": "Age",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "35",
								        "fontSize": "Size12",
								        "value" : getAge(session.user.dob.split('T')[0])//   TODO
							        },
							        {
								        "anchorString": "Address",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "60",
								        "fontSize": "Size12",
								        "value" : session.user.address //   TODO
							        },
							        {
								        "anchorString": "Gender",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "60",
								        "fontSize": "Size12",
								        "value" : session.user.gender //   TODO
							        },
							        {
								        "anchorString": "Product",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "60",
								        "fontSize": "Size12",
								        "value" : prod.productTitle //   TODO
							        },
							        {
								        "anchorString": "Term",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "45",
								        "fontSize": "Size12",
								        "value" : prod.productTerm //   TODO
							        },
							        {
								        "anchorString": "Premium",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "65",
								        "fontSize": "Size12",
								        "value" : prod.premium //   TODO
							        },
							        {
								        "anchorString": "Frequency",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "75",
								        "fontSize": "Size12",
								        "value" : data.paymentFreq //   TODO
							        },
							        {
								        "anchorString": "Id",
								        "tabLabel" : "Application Id",
								        "anchorYOffset": "-8",
								        "anchorXOffset" : "25",
								        "fontSize": "Size12",
								        "value" : data._id //   TODO
							        }],
						        "signHereTabs": [{
							        "anchorString": "Signature",
							        "anchorXOffset": "25",
							        "anchorYOffset": "0",
							        "anchorUnits": "mms",
							        "recipientId": "1",
							        "name": "Please sign here",
							        "optional": "false",
							        "scaleValue": 1,
							        "tabLabel": "Signature"}]
					        }
				        }]
			        }};
		        return request.post({
			        url : baseUrl + "/envelopes",
			        headers : {
				        "X-DocuSign-Authentication" : JSON.stringify(obj)
			        },
			        json : true,
			        body : paramsForEmbeddedSign
		        }, function(err, res, body){
			        var paramsForUrlGen = {
				        "userName": session.user.firstName + " " + session.user.lastName,
				        "email": session.user.email,
				        "recipientId": "1",
				        "clientUserId": "1234",
				        "authenticationMethod": "email",
				        "returnUrl": "http://localhost:3000/project/index.html#!/dashboard"
			        };
			        return request.post({
				        url : baseUrl + "/envelopes/" + body.envelopeId + "/views/recipient",
				        headers : {
					        "X-DocuSign-Authentication" : JSON.stringify(obj)
				        },
				        json : true,
				        body : paramsForUrlGen
			        }, function(err, res, body){
				        console.log("This is the body", body);
				        resParent.json(body.url);
			        })
		        })
	        })
        })
        .catch(function(err){
           resParent.json(err);
        });
}



function createPolicy(req,res) {
    var policy = req.body;
    policyModel.createPolicy(policy)
        .then(function (data) {
	        userModel.addPolicy(data._user, data._id);
	        initiateDocusign(data, req.session, res)
        })
        .catch(function (err) {
            res.json(err)
        });
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