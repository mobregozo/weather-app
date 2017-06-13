(function() {
    'use strict';

    angular
        .module('weatherPortal.forecast', [])
        .config(config)

    //Days constant
    .constant('DAYS', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    
    
    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('app.forecast', {
            url: 'forecast/:cityId',
            views: {
                'content': {
                    templateUrl: 'forecast/forecast.html',
                    controller: 'ForecastCtrl',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();