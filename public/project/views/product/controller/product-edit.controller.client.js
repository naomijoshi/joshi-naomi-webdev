/**
 * Created by Naomi on 8/9/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('productEditController', productEditController);

    function productEditController($location, $routeParams,userService,productService,currentUser) {
        var model = this;
        model.user = currentUser;
        if (currentUser){
            userService.setCurrentUser(currentUser);
        }
        function init() {
            productService.getAllProducts()
                .then(function (data) {
                    model.products = data;
                });

            if ($routeParams.productId && $routeParams.productId!="new") {
                console.log($routeParams.productId);
                productService.findProductById($routeParams.productId)
                    .then(function (data) {
                        model.product = data;
                    });
                model.isUpdate = true;
            }
        }

        model.updateProduct = function (product) {
                if (product.productTitle && product.premium && product.productTerm && product.prodDesc && product.coverage) {
                    productService.updateProduct(product._id, product)
                        .then(function (data) {
                            $location.url("/product");
                        })
                        .catch(function (err) {
                            model.error = "Something went wrong. Please try again later"
                        })
                } else {
                    model.error = "All fields are required";
                }
        };

        model.deleteProduct = function (productId) {
                productService.deleteProduct(productId)
                    .then(function (data) {
                        $location.url("/product");
                    })
                    .catch(function (err) {
                        console.log(err);
                        model.error = "Something went wrong. Please try again later"
                    })
        };

        model.createProduct = function (product) {
            if (product.productTitle && product.premium && product.productTerm && product.prodDesc && product.coverage) {
                productService.createProduct(product)
                    .then(function (data) {
                        $location.url("/product");
                    })
                    .catch(function (err) {
                        model.error = "Something went wrong. Please try again later"
                    })
            } else {
                model.error = "All fields are required";
            }
        };

        init();
    }
})();