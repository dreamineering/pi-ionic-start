'use strict';

require('./user');
require('./interceptor');
//require('./retryqueue');


module.exports = angular.module('drmg.common.security', [
  'drmg.common.security.interceptor',
  'drmg.common.security.user'
])

;
