# README #

This is a SPA application, responsive web site developed using a mobile-first approach, based on an MVC architecture, developed with AngularJs as a main Framework.

Developed By Manuel Obregozo - mobregozo@mobiquityinc.com

## Dependencies and Dev-dependencies

First thing to have installed is NodeJs because, we are going to use the NPM package manager.

Once we have Nodejs plus NPM installed, we could start adding the remaining dependencies, such as gulp which will cover the automation process of the App.

All related task are described in the gulpfile.js

`npm install -g gulp` take into account that this will install gulp globally

To run the test we will need karma-cli installed

`npm install -g karma-cli` this will install the client of karma globally

Then run the following command in order to install all the dependencies:

`npm install`

## Run The App in a Development Mode

By running the default gulp task, we are going to create a local http server to code and watch the updates in live in the default browser.

`gulp`

## Build the App for production

Run the distribution for production src code, this version has some improvents that enhance the performance of the app when running in production environments.

`gulp open-prod`

Zip the App for deployment purpose - depends on the Server

`gulp zip`

## How to Run the Test

Unit Testing with Karma and Jasmine as main framework.
`npm test`

e2e Testing with protractor (make sure the App is running locally)
`npm run protractor`

## Directories and Files Description

package.json : Server-side dependencies.

bower.json : Client-side dependencies.

gulpfile.js : Gulp tasks are specified and described in the file.

/app : Source Code

/app/comonents: Each component /module of the App.
/app/assets : External Files : images, css and vendor libs.
/app/shared : Shaded content  - Header View and templates cache file, the templates.js created by the angular-template-cache task with gulp,  reduce the number of http calls ro retrieve the views( html files). 

/app/index.html : The single page app HTML. 

/app/app.js : Main angular module.
/app/config.js : Main angular configuration.

/e2eTests: Protractor configuration file and test implementation

karma.config.js: Karma configuration file
All test are under each components with the following name convention : *.spec.js

/dist:  Distruibuition src code for production releases, without unneeded libs and code.

##Side Notes

- The intention was to create a well sctrured App, easy to mantain and escalate. 
- Added Bootstrap for a better look and feel.
- Added Angular Chart.js to create a simple Graph
- Added SASS preprocessor in order to type css code fast and clean.
- Added callable methods inside controllers and services at the top, using a technique derived from Module Pattern.
- Used IIFE in order to preven issues with the scope of the variables.
- Why config file for env variables? Using this type of configuration, enables you to separate your application source code from your application config. This will enhance the security of the App, because otherwise you will not share the different access stored there.
- Added minification and concat js and cs files to improve the performance. In order to generate the minification ngAnnotade was added.
- Added jsHint Linter in order to keep an standar in terms of the quality.

##Preview of the App

![alt text](http://i.imgur.com/OFsskhA.png)

![alt text](http://i.imgur.com/RZsqDHx.png)