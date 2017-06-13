(function() {

    'use strict';

    describe('Controller: HomeCtrl', function() {

        // load the controller's module
        beforeEach(module('weatherPortal'));

        var HomeCtrl, myScope, state;

        // Initialize the controller and a mock scope
        beforeEach(inject(function($controller, $rootScope, $stateParams) {
            myScope = $rootScope.$new();
            state = $stateParams;
            HomeCtrl = $controller('HomeCtrl', {
                $scope: myScope
            });
        }));

        it('should Controller be injected', function() {
            expect(HomeCtrl).toBeDefined();
        });

        it('should HomeCtrl contain default values for loadedResults', function() {
            expect(HomeCtrl.loadedResults).toBeFalsy();
        });

        it('should HomeCtrl contain default values for iconURl', function() {
            expect(HomeCtrl.iconUrl).toBeDefined();
        });

    });


})();