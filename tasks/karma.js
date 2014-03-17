'use strict';

// path config
var cfg = require('../gulp_config');

// gulp and general utils
var gulp = require('gulp');

// karma
var karma = require('gulp-karma');


module.exports = gulp.task('karma', ['lint'], function () {
  return gulp.src(cfg.test.js)
    .pipe(karma({
      configFile: 'test/karma/karma.conf.js',
      action: 'run'
    }));
});
