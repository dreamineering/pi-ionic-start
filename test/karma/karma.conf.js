// Karma configuration
// Generated on Sat Jan 25 2014 11:30:59 GMT+0100 (CET)

// TODO swap over to karma-browserifast

module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine', 'browserify'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'src/modules/index.js': ['browserify'],
      'src/modules/**/*.html':  ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      moduleName: "drmg.templates",
      prefix: "",
      stripPrefix: "app"
    },
    autoWatch: false,
    singleRun: false,
    colors: true,
    captureTimeout: 60000,
    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },
    browserify: {
      watch: true,
      require: true
    }
  });
};
