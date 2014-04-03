'use strict';

angular.module('drmg.common.security.userService', [
  'ui.router'
])

.factory('userService',
  function($q, $http, $window, $state ) {

    var currentUser = null;

    var endpoint = 'http://localhost:3003/authenticate';


    function setToken (data) {
      $window.sessionStorage.token = data.token;
      var profile = decodeProfile(data);
      setCurrentUser(profile);
    }

    function decodeProfile(data) {
      var encodedProfile = data.token.split('.')[1];
      return JSON.parse(url_base64_decode(encodedProfile));
    }

    function setCurrentUser(usr) {
      $window.sessionStorage.currentUser = JSON.stringify(usr);
      currentUser = usr;
    }

    //this is used to parse the profile
    function url_base64_decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }

    var service = {

      login: function(email, password) {

        $http
          .post(endpoint, { email: email, password: password })
          .success(function(data, status, headers, config ) {
            console.log(status, headers, config);
            // $window.sessionStorage.token = data.token;
            // var profile = decodeProfile(data);
            // setCurrentUser(profile);
            setToken(data);
            $state.go('home');
          })
          .error(function(msg, status, headers, config) {
            console.log(status, headers, config);
            // erase the token if the user fails to log in
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.currentUser;
            return msg;
          });

      },

      logout: function(){
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.currentUser;
        currentUser = null;
      },

      signup: function(email, password, passwordConfirmation) {

        $http.post(endpoint + '/signup', {
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation
        })
        .success(function(data, status, headers, config) {
          console.log(status, headers, config);
          setToken(data);
          $state.go('home');
        })
        .error(function(data, status, headers, config) {
          console.log(status, headers, config);
          // erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.currentUser;
          return data;
          // pass on a warning message
        });

      },

      /** Returns a promise, sends a request to the server to check if the current cookie is authorized  */
      getProfile: function () {
        //if we've got a current user then just return true
        if (currentUser) {
          return currentUser;
        }
        if ($window.sessionStorage.currentUser) {
          // TODO check if token is still valid
          // then return profile
          currentUser = JSON.parse($window.sessionStorage.currentUser);
          return currentUser;
        }
        return '';
        //return $state.go('login');
      }

    };

    return service;

  }
)

;
