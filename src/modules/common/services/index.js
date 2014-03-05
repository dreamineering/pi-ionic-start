
'use strict';

require('./google_service');

module.exports = angular.module('drmg.services', [
  'drmg.services.google'
])

.value('version', '0.0.1')

;
