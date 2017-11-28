(function () {
    'use strict'

    window.APP = window.APP || {}; 
    APP.NAME = "publicApp";

    angular
        .module(APP.NAME, ['ui.router', APP.NAME + '.routes']);

    angular
        .module(APP.NAME).service("myService", myService);

    myService.$inject = ["$http"];
    function myService($http) {
        var svc = this;
        svc.getLocation = _getLocation;

            function _getLocation(){
                return $http.get("https://api.smartcar.com/v1.0/vehicles/68de505b-0a13-490d-88e2-52765772602c/location", {
                    headers: {
                        'Authorization': 'Bearer 970a78bb-18d5-43e1-90e2-2dab4796dce4'
                    }
                })
            }
    }

    angular
        .module(APP.NAME).controller("myController", myController);

    myController.$inject=["myService"]
    function myController(myService) {
        var vm = this;
        vm.$onInit = _onInit;
        vm.getLocation = _getLocation;


        function _onInit() {
            console.log("my controller initialized");
        };

        function _getLocation() {
            console.log("Hello world");
            myService.getLocation().then(success, error);

            function success(response) { console.log(response); }
            function error(errorMessage) { console.log(errorMessage); }
        }
    }

})();