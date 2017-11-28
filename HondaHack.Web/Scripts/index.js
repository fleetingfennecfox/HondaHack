(function () {
    'use strict';
     
    angular.module("publicApp")
        .controller("indexController", indexController);    

    indexController.$inject = ["$rootScope"];
 
    function indexController($rootScope) {
        var vm = this; 
        vm.btnFindLocation = _btnFindLocation;
        vm.$rootScope = $rootScope;
        vm.showInput = true;
        vm.hideInputBtn = _hideInputBtn;
        vm.fastestRouteClicked = _fastestRouteClicked;
        vm.safestClicked = _safestClicked;
        vm.avoidClicked = _avoidClicked;

        //THE FOLD

        function _fastestRouteClicked() {
            vm.$rootScope.$broadcast('fast');
        }

        function _safestClicked() {
            vm.$rootScope.$broadcast('safe');
        }

        function _avoidClicked() {
            vm.$rootScope.$broadcast('avoid');
        }

        function _hideInputBtn()
        {
            vm.showInput = false;
        }

        function _btnFindLocation() {
            var map, infoWindow;
            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 6
              });
              infoWindow = new google.maps.InfoWindow;
      
              // Try HTML5 geolocation.
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
      
                  infoWindow.setPosition(pos);
                  infoWindow.setContent('Location found.');
                  infoWindow.open(map);
                  map.setCenter(pos);
                }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
            }
        }
    }
})();
