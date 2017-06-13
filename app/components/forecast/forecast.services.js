(function() {
    'use strict';

    angular
        .module('weatherPortal.forecast')
        .factory('forecastService', dataservice);

    dataservice.$inject = ['$http', 'config','$filter','DAYS'];

    function dataservice($http, config, $filter, DAYS) {
        return {
            getcityForecast: getForecastByCity
        };

        // Get forecast of Citis passed by parameters 
        function getForecastByCity(city) {
            return $http.get(config.url + 'forecast?' + 'id='+city, {
                    params: {
                        appid: config.appid,
                        units: config.units,
                        cnt: 6
                    }
                })
                .then(getForecastComplete)
                .catch(getForecastFailed);

            //Get cities current weather
            function getForecastComplete(response) {
                var filtered = response.data.list.map(function(item){                    
                    item.dt = Number(item.dt) * 1000; //convert from unix to timestamp
                    var date = new Date(item.dt);
                    item.main.temp_max = parseInt(item.main.temp_max);
                    item.main.temp_min = parseInt(item.main.temp_min);
                    item.main.temp = parseInt(item.main.temp);
                    item.dayName  = DAYS[date.getDay()];
                    item.labelDate = $filter('date')(item.dt, 'MMM d HH:mm');
                    item.day = date.getFullYear()+'-'+(date.getMonth()<9?('0'+(date.getMonth()+1)):date.getMonth()+1)+'-'+date.getDate(); 
                    return item;
                });
                
                return {
                    list:filtered,
                    city:response.data.city
                };
            }

            function getForecastFailed(error) {
                console.error('XHR Failed for getting forecast weather info ' + error.data);
            }
        }
    }
})();