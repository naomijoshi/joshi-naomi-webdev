/**
 * Created by Naomi on 8/13/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('symptomsController', symptomsController);

    function symptomsController($location, $rootScope, userService) {
        var model = this;
        console.log(model.showProduct);
        model.getSymptoms = function (searchtext) {
            userService.getSymptoms(searchtext)
                .then(function (data) {
                    console.log("Body from health symptoms", data.data);
                    model.symptoms = data.data;
                })
        }

    }
})();