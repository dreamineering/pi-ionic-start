
/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  env: 'development',
  baseURL: 'http://ionic.yourproject.com',
  port: 9090,
  buildDir: 'build',
  compileDir: 'www', // to meet cordova convention

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */

  app: {
    styles:            'src/style/*.scss',
    templates:         'src/modules/**/*.html',
    images:            'src/images/**/*',
    fonts:             'src/fonts/**/*',
    meta:              'src/meta/**/*',
    indexHtml:         'src/index.html',
    appScripts:        'src/modules/**/*.js',
    browserifyEntry:   'src/modules/index.js',
    specs:             'test/**/*.spec.js'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test: {
    js: [
      'src/vendor/ionic.bundle.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/lib/helper/**/*.js',
      'test/**/*.spec.js'
      // 'src/modules/index.js' see karma browserfiy in karma.conf
      // 'src/modules/**/*.html' compliing templates upfront
    ]
  },

  /**
   * TODO try using shim with different components
   */
  vendor: {
    js: [
      'src/vendor/ionic.bundle.js'
    ],
    // Not sure when to use these, prefer this stuff closer together
    css: [
    ],
    assets: [
    ]
  },
};
