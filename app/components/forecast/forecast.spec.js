(function() {

    'use strict';

    describe('Controller: ForecastCtrl', function() {

        // load the controller's module
        beforeEach(module('weatherPortal'));

        var ForecastCtrl, myScope, state;

        // Initialize the controller and a mock scope
        beforeEach(inject(function($controller, $rootScope, $stateParams) {
            myScope = $rootScope.$new();
            state = $stateParams;
            ForecastCtrl = $controller('ForecastCtrl', {
                $scope: myScope
            });
        }));

        it('should Controller be injected', function() {
            expect(ForecastCtrl).toBeDefined();
        });

        it('should ForecastCtrl define default values for chart options', function() {
            expect(ForecastCtrl.options).toBeDefined();
        });

        it('should ForecastCtrl default values for loadResults', function() {
            expect(ForecastCtrl.loadedResults).toBeFalsy();
        });


    });


})();