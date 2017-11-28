(function () {
    'use strict';

    angular
        .module(APP.NAME).component('smartCarLocation', {
            templateUrl: '/app/public/modules/smartCarLocation/smartCarLocation.html',
            controller: 'smartCarLocationController'
        });



    angular
        .module(APP.NAME).service("smartCarLocationService", smartCarLocationService);

    smartCarLocationService.$inject = ["$http"];
    function smartCarLocationService($http) {
        var svc = this;
        svc.getLocation = _getLocation;

        function _getLocation() {
            return $http.get("https://api.smartcar.com/v1.0/vehicles/68de505b-0a13-490d-88e2-52765772602c/location", {
                headers: {
                    'Authorization': 'Bearer 5b058490-73ad-4937-b41f-4e11dbea71e3'
                }
            })
        }
    }

    angular
        .module(APP.NAME).controller("smartCarLocationController", smartCarLocationController);

    smartCarLocationController.$inject = ["smartCarLocationService"]
    function smartCarLocationController(smartCarLocationService) {
        var vm = this;
        vm.$onInit = _onInit;
        vm.getLocation = _getLocation;


        function _onInit() {
            console.log("my controller initialized");
            vm.getLocation();
        };

        function _getLocation() {
            smartCarLocationService.getLocation().then(success, error);

            function success(response) {
                console.log(response);
                var lat = response.data.latitude.toString().split("").splice(0, 9).join("");
                var long = response.data.longitude.toString().split("").splice(0, 11).join("");
                var location = lat + "," + long;
                console.log(location);
            };
            function error(errorMessage) { console.log(errorMessage); }
        }
    }

})();


