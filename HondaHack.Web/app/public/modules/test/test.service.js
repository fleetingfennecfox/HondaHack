(function () {
    "use strict";
    angular
        .module("publicApp")
        .factory("testService", TestService);

    TestService.$inject = ["$http", "$q"];

    function TestService($http, $q) {
        return {
            getIncidentArea: _getIncidentArea
        }
        function _getIncidentArea() {
            return $http.get("http://geohub.lacity.org/datasets/4ba1b8fa8d8946348b29261045298a88_0.geojson")
                .then(_getIncidentAreaSuccess)
                .catch(_getIncidentAreaError);
        }
        function _getIncidentAreaSuccess(res) {
            return res;
        }
        function _getIncidentAreaError(err) {
            return $q.reject(err);
        }
    }
})();