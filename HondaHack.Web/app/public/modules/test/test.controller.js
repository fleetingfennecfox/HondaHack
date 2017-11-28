(function () {
    "use strict";
    angular
        .module("publicApp")
        .controller("testController", TestController);

    TestController.$inject = ["$scope", "testService"];

    function TestController($scope, TestService) {
        var vm = this;
        //Injections
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        //Services
        vm.TestService = TestService;
        //Functions
        vm.accidentHistory = _accidentHistory;
        vm.accidentHistorySuccess = _accidentHistorySuccess;
        vm.accidentHistoryError = _accidentHistoryError;
        //Variables
        vm.results = [];

        //THE FOLD

        function _onInit() {
            _accidentHistory();
        }

        function _accidentHistory() {
            vm.TestService.getIncidentArea()
                .then(vm.accidentHistorySuccess)
                .catch(vm.accidentHistoryError);
        }

        function _accidentHistorySuccess(res) {
            console.log(res);
            for (var i = 0; i < res.data.features.length; i++) {
                vm.results.push(res.data.features[i].geometry.coordinates[0]);
            }
        }

        function _accidentHistoryError(err) {
            console.log(err);
        }
    }
})();