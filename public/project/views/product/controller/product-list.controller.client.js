/**
 * Created by Naomi on 8/9/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('productListController', productListController);

    function productListController($location, $routeParams,userService,productService,currentUser) {
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
        }
        init();
    }
})();