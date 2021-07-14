var Jasmine2HtmlReporter=require("protractor-jasmine2-html-reporter");

exports.config={
    seleniumAddress:'http://localhost:4444/wd/hub',
    specs:['spec.js'],
    // suites:{ //if you want to run only particular testcases
    //     Smoke:[spec.js,otherspec.js],
    //     Regression:[spec.js]

    // },
    onPrepare:function(){
        //Analogous to Before Suite in TestNG:--This is executed before all the testcases
        
        //Setting up Report file
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
              savePath: 'target/screenshots',
              fileNamePrefix:'ExtentReport',
              takeScreenshots:true,
              takeScreenshotsOnlyOnFailure:false,
              cleanDestination:true  //set false if want to retain previous results

            })
          );

    },
    jasmineNodeOpts:{
        showColors:true  ///Using colors in command line reports
    }
};