(function() {
    'use strict';

    angular
        .module('weatherPortal.home')
        .controller('HomeCtrl', HomeController);

    HomeController.$inject = ['config','CITIES', 'currentWeatherService'];

    function HomeController(config, CITIES, currentWeatherService) {
        
        var vm = this;
        vm.iconUrl = config.iconUrl;
        vm.loadedResults = false;
        vm.cities = [];

        getCurrentWeatherCities();

        //Get current weather info of each city
        function getCurrentWeatherCities() {
            return currentWeatherService.getCurrentWeatherByCities(CITIES).then(function(data) {
                vm.cities = data.list;
                vm.loadedResults = true;
            });
        }
    }

})();