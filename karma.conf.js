module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'public/lib/angular/angular.js',
            'public/lib/angular-route/angular-route.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/app.js',
            'public/*[!lib]*/*.js',
            'public/*[!lib]*/*[!tests]*/*.js'
        ],
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
        // preprocessors: {
        //     "public/directives/**/*.html": ["ng-html2js"]
        // },
        // ngHtml2JsPreprocessor: {
        //     stripPrefix: "public/directives/.*/",
        //     prependPrefix: "directives/",
        //     moduleName: "app"
        // }
    });
};