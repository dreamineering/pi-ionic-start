
var cfg = require('./gulp_config');

// flow utilities
var runSequence = require('run-sequence');

// gulp core
var gulp = require('gulp');

// live reload
var livereload = require('gulp-livereload');


// tasks
require('./tasks/clean');
require('./tasks/styles');
require('./tasks/lint');
require('./tasks/templates');
require('./tasks/scripts');
require('./tasks/images');
require('./tasks/assets');
require('./tasks/html');

require('./tasks/karma');
require('./tasks/staticsvr');


gulp.task('watch', ['staticsvr'], function() {
  var server = livereload();
  gulp.watch(cfg.buildDir + '/**').on('change', function(file) {
      server.changed(file.path);
  });

  // Watch for new styles
  gulp.watch(cfg.app.styles, ['styles']);
  // Watch src js files
  gulp.watch(cfg.app.appScripts, ['karma','scripts']);
  // templates
  gulp.watch(cfg.app.templates, ['karma','scripts']);
  // Watch test.spec.js files
  gulp.watch(cfg.app.specs, ['karma']);
  // Watch images
  gulp.watch(cfg.app.images, ['images']);
  // Watch others assets, pretty fast so grouped
  gulp.watch(cfg.app.fonts, ['assets']);
  gulp.watch(cfg.app.meta, ['assets']);
  gulp.watch(cfg.app.icons, ['assets']);
  // index html
  gulp.watch(cfg.app.indexHtml, ['indexHtml']);

})

gulp.task('build', function(callback) {
  runSequence('clean',
              ['templates'],
              ['karma'],
              ['scripts', 'styles','images','assets'],
              'indexHtml',
              callback);
});

gulp.task('publish', function(callback) {
  cfg.env = 'production';
  runSequence('clean', ['templates'],
              ['karma','scripts','styles','images','assets'],
              'indexHtml',
              callback);
});

gulp.task('default', ['build'], function() {});
