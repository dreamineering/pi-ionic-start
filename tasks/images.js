'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var cache = require('gulp-cached');
var imagemin = require('gulp-imagemin');
var gif = require('gulp-if');


module.exports = gulp.task('images', function() {
  return gulp.src(cfg.app.images)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(gif(cfg.env === 'production', gulp.dest('www/assets/img')));
});


