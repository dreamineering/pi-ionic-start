'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var gif = require('gulp-if');
var rename = require('gulp-rename');

// csss
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');


module.exports = gulp.task('styles', function () {
  return gulp.src(cfg.app.styles)
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(cfg.buildDir + '/assets/css'))
    .pipe(rename({suffix : '.min'}))
    .pipe(csso(true))
    .pipe(gulp.dest(cfg.compileDir + '/assets/css'));
});


// an idea how rework could replace sass

// var rework = require('gulp-rework');
// var npm = require('rework-npm');
// var vars = require('rework-vars');
// var dedupe = require('rework-deduplicate');
// var breakpoints = require('rework-breakpoints');

// var calc = require('rework-calc');
// var color = require('rework-color-function');
// var variants = require('rework-font-variant');
// var hex = require('rework-hex-alpha');

// var inherit = require('rework-inherit');
// module.exports = gulp.task('styles', function() {

//   gulp.src(cfg.app.stylesIndex)
//     .pipe(rework(
//     npm(), // future spec
//     vars(), // enhancements
//     dedupe(),
//     breakpoints,
//     calc,
//     variants,
//     hex,
//     color,
//     inherit()))

//     // prefix, optimize, rename
//     .pipe(autoprefixer("last 2 versions", "> 1%", "ie 10"))
//     .pipe(gulp.dest(cfg.buildDir + '/assets/css'))
//     .pipe(gif(cfg.env === 'production', csso(true)))
//     //.pipe(rename({suffix: '.min'}))
//     // dest
//     .pipe(gif(cfg.env === 'production', gulp.dest(cfg.compileDir + '/assets/css')));

// });
