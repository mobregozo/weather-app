(function() {
    'use strict';

    angular
        .module('weatherPortal.home')
        .factory('currentWeatherService', dataservice);

    dataservice.$inject = ['$http', 'config'];

    function dataservice($http, config) {
        return {
            getCurrentWeatherByCities: getCurrentWeatherCities,

        };

        function getCurrentWeatherCities(cities) {
            return $http.get(config.url + 'group?' + 'id='+cities, {
                    params: {
                        appid: config.appid,
                        units: config.units
                    }
                })
                .then(getCurrentWeatherByCitiesComplete)
                .catch(getCurrentWeatherByCitiesFailed);

            function getCurrentWeatherByCitiesComplete(response) {
                return {
                    list: response.data.list,
                };
            }

            function getCurrentWeatherByCitiesFailed(error) {
                console.error('XHR Failed for get Cities List ' + error.data);
            }
        }
    }
})();