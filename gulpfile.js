
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

// gulp.task('watch', function() {

//   // Listen on port 35729
//   server.listen(35729, function (err) {
//     if (err) {
//       return console.log(err)
//     };
//     // Watch tasks go inside inside server.listen()
//     gulp.watch(buildPath.app.styles, ['styles']);

//     // Watch src js files
//     gulp.watch(buildPath.app.appScripts, ['karma', 'scripts']);

//     // Watch .html files
//     gulp.watch(buildPath.app.template, ['karma', 'scripts']);

//     // Watch test.spec.js files
//     gulp.watch(buildPath.app.specs, ['karma']);

//     // Watch image, meta and font files,
//     gulp.watch(buildPath.app.images, ['images']);
//     gulp.watch(buildPath.app.fonts, ['fonts']);
//     gulp.watch(buildPath.app.meta, ['meta']);

//     // Watch the index.html file
//     gulp.watch(buildPath.app.indexHtml, ['index.html']);

//   });

// });


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
