/**
 * Created by Naomi on 8/3/17.
 */
(function () {
    angular
        .module('MyProject')
        .factory('productService', productService)

    function productService($http,$rootScope,$q) {

        function findRecommendedProduct(questions) {
            var url = "/api/product/recommend";
            var body = {
                questions: questions,
                user: $rootScope.currentUser
            };
            return $http.post(url,body)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return err;
                })
        }

        function getAllProducts() {
            var url = "/api/product";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findProductById(productId) {
            var url = "/api/product/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function updateProduct(productId, product) {
            var url = "/api/product/"+productId;
            var body = product;
            return $http.put(url,body)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteProduct(productId) {
            var url = "/api/product/"+productId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return $q.reject(err.data);
                })
        }

        function createProduct(product) {
            var url = "/api/product";
            var body = product;
            return $http.post(url,body)
                .then(function (response) {
                    return response.data;
                })
        }

        return api = {
            findRecommendedProduct:findRecommendedProduct,
            getAllProducts:getAllProducts,
            findProductById:findProductById,
            updateProduct:updateProduct,
            deleteProduct:deleteProduct,
            createProduct:createProduct
        }
    }
})();
