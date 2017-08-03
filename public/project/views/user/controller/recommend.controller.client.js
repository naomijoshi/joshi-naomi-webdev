/**
 * Created by Naomi on 7/20/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('recommendController', recommendController);

    function recommendController($location, userService) {
        var model = this;
        // if(currentUser) {
        //     model.questions = currentUser.questions;
        // }
        console.log("toggle",model.questions.tobacco);

    }
})();