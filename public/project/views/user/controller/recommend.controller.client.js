/**
 * Created by Naomi on 7/20/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('recommendController', recommendController);

    function recommendController($location, $rootScope, productService) {
        var model = this;
        if($rootScope.currentUser) {
            model.questions = $rootScope.currentUser.questions;
        }
        console.log(model.showProduct);
        model.findRecommendedProduct = function (questions) {
                productService.findRecommendedProduct(questions)
                    .then(function (data) {
                        model.showProduct = data;
                    })
        }

    }
})();