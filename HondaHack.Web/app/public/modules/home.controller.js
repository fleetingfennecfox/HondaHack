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

    HomeController.$inject = ["$scope"];

    function HomeController($scope) {
        var vm = this;
        vm.$scope = $scope;


    }
})();