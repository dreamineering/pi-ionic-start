'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var rimraf = require('gulp-rimraf');


module.exports = gulp.task('clean', function() {
  return gulp.src([
    'build/**/*',
    'www/**/*'], { read: false })
    .pipe(rimraf({ force: true }));
});
