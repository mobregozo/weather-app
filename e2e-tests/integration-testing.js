//jshint strict: false

//Check a common flow in the App by choosing the first city and checking if the forecast is being retrieved
describe('Common App Navigation', function() {
    var EC = protractor.ExpectedConditions;

    it('Should browse between views', function() {
        browser.get('http://localhost:9000/');

        expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/home');

        //Click in the first element of the Array of cities
        element.all(by.css('.city-box')).get(1).click().then(function(elm) {
            //Assertion check if the Forecast ID is OK
            expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/forecast/2643743');
            
            //Check amount of items for the forecast is equal to 6
            var completedAmount = element.all(by.css('.forecast-box'));
            expect(completedAmount.count()).toEqual(6);
        });

    });
});