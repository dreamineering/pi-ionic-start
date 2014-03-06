
var _ = require('lodash');
var spawn = require('child_process').spawn;
var es = require('event-stream');

// flow utilities
var path = require('path');
var gif = require('gulp-if');
var runSequence = require('run-sequence');

// gulp core
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var cache = require('gulp-cached');
var flatten = require('gulp-flatten');

// css
var sass = require('gulp-sass');
// var myth = require('gulp-drmg-myth');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// scripts
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var brfs = require('brfs');
var debowerify = require('debowerify');
var coffee = require('gulp-coffee');
var stylish = require('jshint-stylish');

// templates
var ngHtml2js = require('gulp-ng-html2js');
var minifyHtml = require("gulp-minify-html");

// images
var imagemin = require('gulp-imagemin');

// live reload
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

// test
var karma = require('gulp-karma');
// publish
var bump = require('gulp-bump');
var git = require('gulp-git');

var buildPath = require('./gulp_config');

gulp.task('styles', function () {
  return gulp.src(buildPath.app.styles)
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(rename({suffix : '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('www/assets/css'))
    .pipe(livereload(server))
    .pipe(notify({ message : 'Styles task complete'}));;
});

gulp.task('templates', function() {
  return gulp.src(buildPath.app.templates)
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
    .pipe(gulp.dest("src/templates"))
    .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('lint', function(){
  return gulp.src(buildPath.app.appScripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('browserify', function() {
  return gulp.src(buildPath.app.browserifyEntry)
    .pipe(browserify({
      insertGlobals : true,
      debug : !gutil.env.production
    }))
    .pipe(concat('browserified.js'))
    .pipe(gulp.dest('build/assets/js/process'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
// Needed to split ionic out of browserify as there were issues
// a global variable in the scrolling plugin used from zynga
gulp.task('ionic', function() {
  return gulp.src(buildPath.vendor.js)
    .pipe(concat('ionic.js'))
    .pipe(gulp.dest('build/assets/js/process'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('modules', ['browserify', 'ionic', 'templates'], function() {
  return gulp.src([
      'build/assets/js/process/ionic.js',
      'build/assets/js/process/browserified.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gif(gutil.env.production, ngmin()))
    .pipe(gif(gutil.env.production, uglify()))
    .pipe(gulp.dest('www/assets/js'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src(buildPath.app.images)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(gulp.dest('www/assets/img'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('fonts', function() {
  return gulp.src(buildPath.app.fonts)
    .pipe(gulp.dest('build/assets/fonts'))
    .pipe(gulp.dest('www/assets/fonts'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Fonts task complete' }));
});

gulp.task('meta', function() {
  return gulp.src(buildPath.app.meta)
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('www'))
    .pipe(notify({ message: 'Meta files copied over' }));
});

// Index
gulp.task('index.html', function () {
  gulp.src(buildPath.app.indexHtml)
    .pipe(gulp.dest('build'))
    .pipe(replace("assets/js/app.js", "assets/js/app.min.js"))
    .pipe(replace("assets/css/main.css", "assets/css/main.min.css"))
    .pipe(gulp.dest('www'))
    .pipe(notify({ message: 'Images task complete' }));
});

// update versions
gulp.task('bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

// git commit
gulp.task('tag', ['bump'], function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});


// Karma
gulp.task('karma', ['lint'], function () {
  return gulp.src(buildPath.test.js)
    .pipe(karma({
      configFile: 'test/karma/karma.conf.js',
      action: 'run'
    }));
});

gulp.task('clean', function() {
  return gulp.src([
      'src/templates',
      'build/**/*',
      'www/**/*'
    ], {read: false})
    .pipe(clean());
});


gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };
    // Watch tasks go inside inside server.listen()
    gulp.watch(buildPath.app.styles, ['styles']);

    // Watch src js files
    gulp.watch(buildPath.app.appScripts, ['karma', 'modules']);

    // Watch .html files
    gulp.watch(buildPath.app.template, ['karma', 'modules']);

    // Watch test.spec.js files
    gulp.watch(buildPath.app.specs, ['karma']);

    // Watch image, meta and font files,
    gulp.watch(buildPath.app.images, ['images']);
    gulp.watch(buildPath.app.fonts, ['fonts']);
    gulp.watch(buildPath.app.meta, ['meta']);

    // Watch the index.html file
    gulp.watch(buildPath.app.indexHtml, ['index.html']);

  });

});


gulp.task('build', function(callback) {
  runSequence('clean',
              ['templates'],
              ['karma'],
              ['modules', 'styles'],
              ['images','fonts','meta'],
              'index.html',
              callback);
});

gulp.task('default', ['build'], function() {});
