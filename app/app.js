(function() {
    'use strict';

    angular.module('weatherPortal', ['ui.router', 'templates', 'chart.js' ,'ui.bootstrap' , 'weatherPortal.config', 'weatherPortal.home', 'weatherPortal.forecast'])

    .config(function($stateProvider, $urlRouterProvider) {

        // Abstract state of the app
        $stateProvider.state('app', {
            url: '/',
            abstract: true,
            templateUrl: 'header.html'
        });

        // Default route 
        $urlRouterProvider.otherwise('/home');
    });
})();