'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var concat = require('gulp-concat');
var gif = require('gulp-if');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

// scripts browserify
var browserify = require('gulp-browserify');
var shim = require('browserify-shim');
var brfs = require('brfs');
var debowerify = require('debowerify');
// angular
var ngmin = require('gulp-ngmin');
// compact
var uglify = require('gulp-uglify');
//var coffee = require('gulp-coffee');


module.exports = gulp.task('scripts', ['lint', 'browserify', 'ionic', 'templates'], function() {
  return gulp.src([
      'build/assets/js/process/ionic.js',
      'build/assets/js/process/browserified.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(gif(cfg.env === 'production', rename({suffix: '.min'})))
    .pipe(gif(cfg.env === 'production', ngmin()))
    .pipe(gif(cfg.env === 'production', uglify()))
    .pipe(gif(cfg.env === 'production', gulp.dest('www/assets/js')));
});

gulp.task('browserify', function() {
  return gulp.src(cfg.app.browserifyEntry)
    .pipe(browserify({
      insertGlobals : true,
      debug : true
    }))
    .pipe(concat('browserified.js'))
    .pipe(gulp.dest('build/assets/js/process'));
});

// Needed to split ionic out of browserify as there were issues
// a global variable in the scrolling plugin used from zynga
gulp.task('ionic', function() {
  return gulp.src(cfg.vendor.js)
    .pipe(concat('ionic.js'))
    .pipe(gulp.dest('build/assets/js/process'));
});

