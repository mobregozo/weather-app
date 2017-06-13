(function () {
    'use strict';

    angular
        .module('weatherPortal.forecast')
        .controller('ForecastCtrl', ForecastController);

    ForecastController.$inject = ['config', 'forecastService', '$stateParams'];

    function ForecastController(config, forecastService, $stateParams) {
        var vm = this;
        vm.cityForecast = [];
        vm.iconUrl = config.iconUrl;
        vm.loadedResults = false;

        getCityForecast($stateParams.cityId);

        //Get forecast info of the city
        function getCityForecast(cityId) {
            return forecastService.getcityForecast(cityId).then(function (data) {
                vm.cityForecast = data.list;
                vm.cityInfo = data.city;
                vm.labels = vm.cityForecast.map(function (item) {
                    return item.labelDate;
                });
                vm.data = vm.cityForecast.map(function (item) {
                    return item.main.temp;
                });
                vm.loadedResults = true;
            });
        }

        //Chart Options
        vm.options = {
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        return parseInt(data.datasets[0].data[tooltipItem.index])+ "°";
                    }
                }
            },
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        callback: function(value, index, values) {
                            return value + "°";
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature'
                    }
                }],
                xAxes: [{
                    display: true
                }],
            }
        };

    }

})();