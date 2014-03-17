'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
// metalsmith & handlebars
var Handlebars = require('handlebars');
require('../templates/helpers')(cfg, Handlebars);


var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');


module.exports = gulp.task('metalsmith', function(cb) {

  var m = Metalsmith(__dirname);
  m.source('../content');
  m.destination('../build');

  m.use(markdown({
    smartypants: true,
    smartLists: true,
  }));
  m.use(templates({
    engine: 'handlebars',
    directory: '../templates'
  }));
  m.use(permalinks());
  m.build(function(err) {
    if (err) return console.error(err);
    //console.log('metalsmith complete')
    cb();
  });

});
