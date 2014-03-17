'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var gutil = require('gulp-util');

// live reload
var livereload = require('gulp-livereload');

gulp.task('staticsvr', function(next) {
  var staticS = require('node-static');
  var server = new staticS.Server('./' + cfg.buildDir);

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(cfg.port, function() {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(cfg.port));
    next();
  });

});

