(function () {
    'use strict';

    var app = angular.module(APP.NAME + '.routes', []);

    app.config(_configureStates);

    _configureStates.$inject = ['$stateProvider', '$locationProvider'];

    function _configureStates($stateProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        //chained example;
        $stateProvider
            .state({
                name: 'test',
                url: '/test',
                templateUrl: '/app/public/modules/test/test.html',
                title: 'Test',
                controller: 'testController as testCtrl'
            });
    }
})();