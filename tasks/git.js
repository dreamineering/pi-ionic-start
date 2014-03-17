'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');

// publish
var bump = require('gulp-bump');
var git = require('gulp-git');

// update versions TODO
// gulp.task('bump', function () {
//   return gulp.src(['./package.json'])
//     .pipe(bump())
//     .pipe(gulp.dest('./'));
// });

// git commit
// gulp.task('tag', ['bump'], function () {
//   var pkg = require('./package.json');
//   var v = 'v' + pkg.version;
//   var message = 'Release ' + v;

//   return gulp.src('./')
//     .pipe(git.commit(message))
//     .pipe(git.tag(v, message))
//     .pipe(git.push('origin', 'master', '--tags'))
//     .pipe(gulp.dest('./'));
// });


