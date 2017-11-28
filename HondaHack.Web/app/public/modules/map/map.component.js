(function () {
    "use strict";

    angular.module("publicApp")
        .component("mapDetails", {
            templateUrl: "/app/public/modules/map/map-details.html",
            controller: "mapController"});
})();

(function () {
    "use strict";

    angular.module("publicApp")
        .controller("mapController", MapController);

    MapController.$inject = ["$scope", "$window"];

    function MapController($scope, $window) {
        var vm = this;
        vm.$scope = $scope;
        vm.$window = $window;
        vm.$onInit = _onInit;
        vm.$window.initMap = _initMap;
        vm.polylines = [];
        vm.markerArray = [];
        


        function _onInit() {
            console.log("map controller initialized!");
        };

        function _initMap() {
            //new direction service by google maps
            vm.directionsService = new google.maps.DirectionsService;
            // create a map and center on set point
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: { lat: 34.0522, lng: -118.2437 }
            });
            vm.olympics = [{ position: new google.maps.LatLng(33.94616, -118.336119), title: 'LA Stadium' },
            { position: new google.maps.LatLng(33.95820919323983, -118.34187805652618), title: 'The Forum' },
            { position: new google.maps.LatLng(34.1606364, -118.1674865), title: 'Rose Bowl' },
            { position: new google.maps.LatLng(34.000602, -118.485658), title: 'Santa Monica Beach' },
            { position: new google.maps.LatLng(34.07037797099821, -118.44678461551666), title: 'Pauley Pavilion' },
            { position: new google.maps.LatLng(33.86385889756237, -118.26159954071045), title: 'StubHub Center' },
            { position: new google.maps.LatLng(34.189857, -118.451355), title: 'Sepulveda Basin Sports Complex' },
            { position: new google.maps.LatLng(33.807836, -117.876544), title: 'Honda Center' },
            { position: new google.maps.LatLng(33.8570, -117.1765), title: 'Lake Perris' },
            { position: new google.maps.LatLng(34.050242, -118.502312), title: 'Riviera Country Club' },
            { position: new google.maps.LatLng(34.077098, -117.807330), title: 'Frank G.Bonelli Regional Park' },
            { position: new google.maps.LatLng(34.069600, -118.446972), title: 'UCLA Student Housing' }]
            // Create a renderer for directions and bind it to the map.
            vm.directionsDisplay = new google.maps.DirectionsRenderer({ map: vm.map });
            // Instantiate an info window to hold step text.
            vm.stepDisplay = new google.maps.InfoWindow;
            vm.calculateAndDisplayRoute = _calculateAndDisplayRoute;
            vm.markerArray = [];
            for (var i = 0; i < vm.olympics.length; i++) {
                var marker = new google.maps.Marker({
                    position: vm.olympics[i].position,
                    map: vm.map,
                    title: vm.olympics[i].title,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                });
                vm.markerArray.push(marker);
            }
            // Display the route between the initial start and end selections.
            vm.calculateAndDisplayRoute(
                vm.directionsDisplay, vm.directionsService, vm.markerArray, vm.stepDisplay, vm.map);

            // Listen to change events from the start and end lists.
            vm.onChangeHandler = function () {
                vm.calculateAndDisplayRoute(
                    vm.directionsDisplay, vm.directionsService, vm.markerArray, vm.stepDisplay, vm.map);
            };
            document.getElementById('start').addEventListener('change', vm.onChangeHandler);
            document.getElementById('end').addEventListener('change', vm.onChangeHandler);
        };

        function _calculateAndDisplayRoute (directionsDisplay, directionsService,
            markerArray, stepDisplay, map) {

            var directionsRequest = {
                origin: document.getElementById('start').value,
                destination: document.getElementById('end').value,
                provideRouteAlternatives: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL
            };
            // Retrieve the start and end locations and create a DirectionsRequest using
            // WALKING directions.
            directionsService.route(
                directionsRequest, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        var coordinatesArray = [];

                        var totalPoints = 0;
                        var routeData = [];
                        

                        for (var i = 0, len = response.routes.length; i < len; i++) {


                            var eventLat = 33.86385889756237;
                            var eventLng = -118.26159954071045;
                            var route1 = 0;
                            var route2 = 0;
                            var route3 = 0;
                            var totalDistance = 0;
                            var directions = [];
                            response.routes[0].legs[0].steps.forEach(function (step) {
                                function html2text(html) {
                                    var tag = document.createElement('div');
                                    tag.innerHTML = html;

                                    return tag.innerText;
                                }

                                var outputInstructions = html2text(step.instructions);
                                var outputDistance = html2text(step.distance.text);
                                directions.push({ instruction: outputInstructions, distance: outputDistance });
                            });

                            for (var j = 0; j < response.routes[i].overview_path.length; j++) {
                                totalDistance += distance(eventLat, eventLng, response.routes[i].overview_path[j].lat(), response.routes[i].overview_path[j].lng());
                            }
                            totalPoints += response.routes[i].overview_path.length;
                            var temp = totalDistance / response.routes[i].overview_path.length;

                            console.log("route" + i + " " + totalDistance);

                            console.log("totalPoints:" + totalPoints);

                            routeData.push({ route: i, routeDistance: temp, directions: directions });

                        }
                        routeData.sort(function (a, b) { return a.routeDistance - b.routeDistance })

                        if (vm.polylines.length > 0) {
                            for (var i = 0; i < vm.polylines.length; i++) {
                                console.log(vm.polylines);
                                vm.polylines[i].setPath([]);
                            };
                        };

                        for (var i = 0; i < routeData.length; i++) {
                            var polyline = null;
                            if (i == 0) {
                                polyline = new google.maps.Polyline({
                                    strokeColor: '#0000FF',
                                    strokeOpacity: 0.5,
                                    strokeWeight: 7
                                });
                                new google.maps.DirectionsRenderer({
                                    map: map,
                                    directions: response,
                                    polylineOptions: polyline,
                                    routeIndex: i
                                });
                            }
                            else {
                                polyline = new google.maps.Polyline({
                                    strokeColor: '#FF0000',
                                    strokeOpacity: 0.5,
                                    strokeWeight: 7
                                });
                                new google.maps.DirectionsRenderer({
                                    map: map,
                                    directions: response,
                                    polylineOptions: polyline,
                                    routeIndex: i
                                });

                            }
                            vm.polylines.push(polyline);
                        }
                        console.log(routeData);
                    }
                });
        };

        function distance(lat1, lng1, lat2, lng2) {
            var getDistance = Math.sqrt(((lat1 - lng1) * (lat1 - lng1)) + ((lat2 - lng2) * (lat2 - lng2)))
            return getDistance;
        };

        function showSteps(directionResult, markerArray, stepDisplay, map) {
            // For each step, place a marker, and add the text to the marker's infowindow.
            // Also attach the marker to an array so we can keep track of it and remove it
            // when calculating new routes.
            var myRoute = directionResult.routes[0].legs[0];
            for (var i = 0; i < myRoute.steps.length; i++) {
                var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                marker.setMap(map);
                marker.setPosition(myRoute.steps[i].start_location);
                attachInstructionText(
                    stepDisplay, marker, myRoute.steps[i].instructions, map);
            };
        };
    };
})();         
