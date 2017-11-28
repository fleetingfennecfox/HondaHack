(function () {
    'use strict';

    var app = angular.module('publicApp' + '.routes', []);

    app.config(_configureStates);

    _configureStates.$inject = ['$stateProvider', '$locationProvider'];

    function _configureStates($stateProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });        

        $stateProvider
            .state({
                name: 'map',
                url: '/public/map',
                templateUrl: '/app/public/modules/map/map.html'
            })
            .state({
                name: 'home',
                url: '/public/home',
                templateUrl: '/app/public/modules/homePage.html'
            });
    }

})();