/**
 * Created by Naomi on 7/20/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('recommendController', recommendController);

    function recommendController($location, userService) {
        var model = this;
        var autocomplete;
        var map;
        model.display = true;
        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        function initialize() {
            autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'),{ types: ['geocode'] });
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                fillInAddress();
            });
        }

        function fillInAddress() {
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();

            // for (var component in componentForm) {
            //     document.getElementById(component).value = '';
            //     document.getElementById(component).disabled = false;
            // }
            //
            // // Get each component of the address from the place details
            // // and fill the corresponding field on the form.
            // for (var i = 0; i < place.address_components.length; i++) {
            //     var addressType = place.address_components[i].types[0];
            //     if (componentForm[addressType]) {
            //         var val = place.address_components[i][componentForm[addressType]];
            //         document.getElementById(addressType).value = val;
            //     }
            // }
            var uluru = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: uluru
            });
            console.log("MAP",map);
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }

        model.findAddress = function (address) {
            model.display = false;
            var place = autocomplete.getPlace();
            console.log("place", place.geometry.location.lat());
        };

        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
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
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }
})();