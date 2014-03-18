'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var gif = require('gulp-if');


var minifyHtml = require("gulp-minify-html");
var replace = require('gulp-replace');

module.exports = gulp.task('indexHtml', function () {
  gulp.src(cfg.app.indexHtml)
    .pipe(gulp.dest(cfg.buildDir))
    .pipe(gif(cfg.env === 'production', replace("assets/js/app.js", "assets/js/app.min.js")))
    .pipe(gif(cfg.env === 'production', replace("assets/css/main.css", "assets/css/main.min.css")))
    .pipe(gif(cfg.env === 'production', gulp.dest(cfg.compileDir)));
})
