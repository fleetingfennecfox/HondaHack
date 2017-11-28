(function () {
    "use strict";
    angular.module("publicApp")
        .component("homePage", {
            templateUrl: '/app/public/modules/home.html',
            controller: 'homeController'
        });
})();

(function () {
    "use strict";
    angular
        .module("publicApp")
        .controller("homeController", HomeController);

    HomeController.$inject = ["$scope", "$location"];

    function HomeController($scope, $location) {
        var vm = this;
        vm.$scope = $scope;
        vm.$location = $location
        vm.submittedCity = _submittedCity;

        function _submittedCity() {
            console.log("clicked city");
            vm.$location.path("/public/map");
        }
    }
})();