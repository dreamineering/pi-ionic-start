'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var minifyHtml = require("gulp-minify-html");

module.exports = gulp.task('html', function () {
  // empty - do not remove empty attributes
  // cdata - do not strip CDATA from scripts
  // comments - do not remove comments
  // conditionals - do not remove conditional internet explorer comments
  // spare - do not remove redundant attributes
  // quotes - do not remove arbitrary quotes
  var opts = {spare:true,quotes:true};
  return gulp.src(cfg.app.html)
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest(cfg.compileDir));
});

// Index
// gulp.task('indexHtml', ['html'], function () {
//   return gulp.src(cfg.app.indexHtml)
//     .pipe(replace("assets/js/app.js", "assets/js/app.min.js"))
//     .pipe(replace("assets/css/main.css", "assets/css/main.min.css"));
// });
