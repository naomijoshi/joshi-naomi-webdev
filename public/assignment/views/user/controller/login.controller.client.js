/**
 * Created by Naomi on 6/13/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = function (username,password) {
            if(!username || !password) {
                model.message = "Username,password cannot be blank";
                return;
            }
            userService.findUserByCredentials(username,password)
                .then(function (data) {
                    {
                        console.log("user coming back from service", data);
                        $location.url("/user/"+data._id);
                    }
                }, function (err) {
                        model.message = "Username "+username+ " not found";
                });
        }
    }
})();