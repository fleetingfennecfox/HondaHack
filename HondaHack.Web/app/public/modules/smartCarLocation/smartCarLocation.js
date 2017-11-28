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
                    'Authorization': 'Bearer 396a48f5-a5f3-403c-b29f-57c4d4cb5847'
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
        };

        function _getLocation() {
            console.log("Hello world");
            smartCarLocationService.getLocation().then(success, error);

            function success(response) { console.log(response); }
            function error(errorMessage) { console.log(errorMessage); }
        }
    }

})()


