/**
 * Created by Naomi on 6/14/17.
 */

(function () {
    angular
        .module('MyProject')
        .controller('profileController', profileController);

    function profileController($location, currentUser, userService) {
        var model = this;
        var autocomplete;
        model.user = currentUser;
        if(currentUser) {
            userService.setCurrentUser(currentUser);
        }
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'),{ types: ['geocode'] });

        model.geolocate = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var geolocation = new google.maps.LatLng(
                        position.coords.latitude, position.coords.longitude);
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    autocomplete.setBounds(circle.getBounds());
                });
            }
        };

        google.maps.event.addDomListener(window, 'load', function () {
        });


        model.update = function (user) {
            if (user){
                if(place) {
                    var place = autocomplete.getPlace();
                    user.address = place.formatted_address;
                }
                console.log("address in place", place);
                console.log("address to be updated", user.address);
                userService.updateUser(user._id, user)
                    .then(function (response) {
                        model.message = response;
                    });
            }
        };

        model.delete = function (user) {
            if (user){
                userService.deleteUser(user._id)
                    .then(function (response) {
                        $location.url("/home");
                    });
            }
        }
    }
})();