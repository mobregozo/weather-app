(function() {
    'use strict';

    angular
        .module('weatherPortal.home', [])
        .config(config)

    //Selected Cities to Show
    .constant('CITIES', "3117735,2643743,2759794,2988507,3169070" );

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('app.home', {
            url: 'home',
            views: {
                'content': {
                    templateUrl: 'home/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();