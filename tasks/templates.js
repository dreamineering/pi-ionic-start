'use strict';

// path config
var cfg = require('../gulp_config');

// gulp and general utils
var gulp = require('gulp');
var gif = require('gulp-if');
var concat = require('gulp-concat');

// templates
var ngHtml2js = require('gulp-ng-html2js');
var minifyHtml = require("gulp-minify-html");


module.exports = gulp.task('templates', function() {
  return gulp.src(cfg.app.templates)
    // .pipe(minifyHtml({ // TODO issue with quotes
    //     empty: true,
    //     spare: true
    // }))
    .pipe(ngHtml2js({
        moduleName: "drmg.templates",
        prefix: "",
        stripPrefix: "app"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("src/templates"));
});
