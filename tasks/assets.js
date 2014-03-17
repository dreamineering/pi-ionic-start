'use strict';

// path config
var cfg = require('../gulp_config');

var runSequence = require('run-sequence');

var gulp = require('gulp');
var cache = require('gulp-cached');
var imagemin = require('gulp-imagemin');
var gif = require('gulp-if');


module.exports = gulp.task('assets', function(callback) {
  runSequence(['icons','images','fonts','meta'],
              callback);
});

gulp.task('icons', function() {
  return gulp.src(cfg.app.icons)
    //.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/icons'))
    .pipe(gif(cfg.env === 'production', gulp.dest('www/assets/icons')));
});

gulp.task('images', function() {
  return gulp.src(cfg.app.images)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(gif(cfg.env === 'production', gulp.dest('www/assets/img')));
});

gulp.task('fonts', function() {
  return gulp.src(cfg.app.fonts)
    .pipe(gulp.dest('build/assets/fonts'))
    .pipe(gif(cfg.env === 'production', gulp.dest('www/assets/fonts')));
});

gulp.task('meta', function() {
  return gulp.src(cfg.app.meta)
    .pipe(gulp.dest('build'))
    .pipe(gif(cfg.env === 'production', gulp.dest('www')));
});

