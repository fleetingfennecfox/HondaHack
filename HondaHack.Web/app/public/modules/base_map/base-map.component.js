(function () {
    "use strict";

    angular.module("publicApp")
        .component("baseMap", {
            templateUrl: "/app/public/modules/base_map/map-base.html",
            controller: "baseMapController"
        });
})();

(function () {
    "use strict";

    angular.module("publicApp")
        .controller("baseMapController", BaseMapController);

    BaseMapController.$inject = ["$scope", "$window"];

    function BaseMapController($scope, $window) {
        var vm = this;
        vm.$scope = $scope;
        vm.$window = $window;
        vm.$window.init = _init;
        vm.$onInit = _onInit;

        function onInit() {
            console.log("Base Map Controller Initialized");
        };

        function _init() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(logLocation);
                function logLocation(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    console.log("You are currently in latitude of: " + latitude + " and longitude of " + longitude);
                    window.latlng = { lat: latitude, lng: longitude };
                }
            }

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: { lat: 41.85, lng: -87.65 }
            });
            directionsDisplay.setMap(map);

            var onChangeHandler = function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
            document.getElementById('start').addEventListener('change', onChangeHandler);
            document.getElementById('end').addEventListener('change', onChangeHandler);
        }

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            directionsService.route({
                origin: document.getElementById('start').value,
                destination: document.getElementById('end').value,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        };
    };
})();