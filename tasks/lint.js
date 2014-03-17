'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');

// scripts browserify
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = gulp.task('lint', function(){
  return gulp.src(cfg.app.appScripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});



