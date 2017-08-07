/**
 * Created by Naomi on 8/5/17.
 */
var app = require('../../server');
var productModel = require('../model/product/product.model.server');
var userModel = require('../model/user/user.model.server');


var passport = require('passport');

app.post('/api/product/recommend', findRecommendedProduct);

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