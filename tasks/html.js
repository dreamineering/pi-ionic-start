'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var minifyHtml = require("gulp-minify-html");
var replace = require('gulp-replace');

module.exports = gulp.task('indexHtml', function () {
  gulp.src(cfg.app.indexHtml)
    .pipe(gulp.dest(cfg.buildDir))
    .pipe(replace("assets/js/app.js", "assets/js/app.min.js"))
    .pipe(replace("assets/css/main.css", "assets/css/main.min.css"))
    .pipe(gulp.dest(cfg.compileDir));
})
