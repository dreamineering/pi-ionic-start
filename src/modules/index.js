
/*
 * public/app/index.js
 */
'use strict';

// require('angular/angular');
// require('angular-animate/angular-animate');
// require('angular-sanitize/angular-sanitize');
// require('angular-ui-router/release/angular-ui-router');

// can do this when issues with browserify are resolved
// require('../vendor/ionic');

// templates
require('../templates/templates');

// common
require('./common/security');
require('./common/services');
require('./common/filters');
require('./common/components');

// app
require('./app/pages');
//require('./app/login');

// Register app.
require('./app');



