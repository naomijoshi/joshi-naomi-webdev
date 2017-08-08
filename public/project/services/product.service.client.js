/**
 * Created by Naomi on 8/3/17.
 */
(function () {
    angular
        .module('MyProject')
        .factory('productService', productService)

    function productService($http,$rootScope) {

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

        return api = {
            findRecommendedProduct:findRecommendedProduct,
            getAllProducts:getAllProducts
        }
    }
})();
