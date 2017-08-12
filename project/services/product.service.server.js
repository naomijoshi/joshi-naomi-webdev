/**
 * Created by Naomi on 8/5/17.
 */
var app = require('../../server');
var productModel = require('../model/product/product.model.server');
var userModel = require('../model/user/user.model.server');
var policyModel = require('../model/policy/policy.model.server');


app.post('/api/product/recommend', findRecommendedProduct);
app.get('/api/product',getAllProducts);
app.get('/api/product/:productId',findProductById);
app.put('/api/product/:productId',updateProduct);
app.delete('/api/product/:productId',deleteProduct);
app.post('/api/product',createProduct);




function findRecommendedProduct(req, res) {
    var questions = req.body.questions;
    var user = req.body.user;
    if (user) {
        user.questions = questions;
        userModel.updateUser(user._id,user);
    }
    var saving = (questions.income + questions.savings)- (questions.debts + questions.expense*12);
    if (questions.tobacco) {
        saving = saving - 50000;
    }
    if (questions.householdNo > 2) {
        saving = saving + 50000;
    }
    console.log("savings", saving);
    if ((saving >= 0) && (saving < 100000)) {
        productModel.findProductByTitle("Bronze")
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            })
    }

    if ((saving >= 100000) && (saving < 200000)) {
        productModel.findProductByTitle("Silver")
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            })
    }

    if (saving >= 200000) {
        productModel.findProductByTitle("Gold")
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            })
    }
}

function getAllProducts(req, res) {
    productModel.findAllProducts()
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        })
}

function findProductById(req,res) {
    var productId = req.params["productId"];
    productModel.findProductById(productId)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        })
}

function updateProduct(req,res) {
    var productId = req.params["productId"];
    var product = req.body;
    productModel.updateProduct(productId,product)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (data) {
            res.json(err);
        })
}

function deleteProduct(req,res) {
    var productId = req.params["productId"];
    policyModel.findAllPolicies()
        .then(function (data) {
            var policies = data;
            for(var p in policies){
                if(productId == policies[p]._product) {
                    res.status(401).json("You cannot delete this product as this is being used by a user "+ policies[p].firstName+ " "+policies[p].lastName);
                    return;
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    productModel.deleteProduct(productId)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (data) {
            res.json(err);
        })
}

function createProduct(req,res) {
    var product = req.body;
    productModel.createProduct(product)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (data) {
            res.json(err);
        })
}
