/**
 * Created by Naomi on 7/14/17.
 */
var productSchema = require("./product.schema.server");
var mongoose = require('mongoose');
var productModel = mongoose.model('ProductModel', productSchema);


module.exports = productModel;

productModel.findProductById = findProductById;
productModel.createProduct = createProduct;
productModel.findProductByTitle = findProductByTitle;
productModel.deleteProduct=deleteProduct;
productModel.updateProduct=updateProduct;
productModel.findAllProducts=findAllProducts;

function findProductById(productId) {
   return productModel.findById(productId);
}

function findAllProducts() {
    return productModel.find();
}

function createProduct(product) {
   return productModel.create(product);
}

function findProductByTitle(title) {
   return productModel.find({productTitle:title});
}

function deleteProduct(productId) {
   return productModel.remove({_id:productId});
}

function updateProduct(productId,product) {
   return productModel.update({_id:productId},{$set:product});
}

