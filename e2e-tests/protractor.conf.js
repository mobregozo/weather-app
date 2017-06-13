//jshint strict: false
exports.config = {

    allScriptsTimeout: 11000,

    specs: ['integration-testing.js'],

    capabilities: {
        'browserName': 'chrome'
    },

    directConnect:true,

    baseUrl: 'http://localhost:9000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }

};