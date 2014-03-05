(function(module) {
try {
  module = angular.module('drmg.templates');
} catch (e) {
  module = angular.module('drmg.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/pages/about.html',
    '<h1>About</h1>');
}]);
})();

(function(module) {
try {
  module = angular.module('drmg.templates');
} catch (e) {
  module = angular.module('drmg.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/pages/home.html',
    '<h1>Home</h1>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('drmg.templates');
} catch (e) {
  module = angular.module('drmg.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/pages/patterns.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('drmg.templates');
} catch (e) {
  module = angular.module('drmg.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/login/templates/login.html',
    '<section class="loginform">\n' +
    '  <form name="loginform" no-validate ng-submit="login()" accept-charset="utf-8">\n' +
    '    <ul>\n' +
    '      <li><label for="usermail">Email</label>\n' +
    '      <input type="email" ng-model="loggingInUser.email" name="usermail" placeholder="yourname@email.com" required></li>\n' +
    '      <li><label for="password">Password</label>\n' +
    '      <input type="password" ng-model="loggingInUser.password" name="password" placeholder="password" required></li>\n' +
    '      <li><input type="submit" class="button" value="Login"></li>\n' +
    '      <input type="hidden" name="login_form" ng-model="loggingInUser.login_form" value="true" />\n' +
    '    </ul>\n' +
    '    <ul>\n' +
    '      <li ng-repeat="(name, err) in loggingInUser.errors">\n' +
    '        <span>{{ name }}</span>: {{ err }}\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </form>\n' +
    '  <hr />\n' +
    '  <button id="googleAuthButton" class="radius" ng-click="auth_with_google()">Try it! Sign in with google</button>\n' +
    '</section>\n' +
    '');
}]);
})();
