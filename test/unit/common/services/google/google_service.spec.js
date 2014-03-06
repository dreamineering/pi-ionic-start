describe('Unit: Google Services', function() {

  // beforeEach(angular.mock.module('drmg'));

  // describe('googleServices', function() {
  //   var googleApi;
  //   var q;
  //   var resolvedValue;

  //   beforeEach(inject(function($injector) {
  //     googleApi = $injector.get('googleApi');
  //     q = $injector.get('$q');
  //     spyOn(googleApi, 'gapi')
  //       .andCallFake(function() {
  //         var d = q.defer();
  //         setTimeout(function() {
  //           resolvedValue = {
  //             clientId: '12345'
  //           };
  //         }, 100);
  //         return d.promise;
  //       });
  //     googleApi.gapi().then(function(resp) {
  //       resolvedValue = resp;
  //     });
  //   }));

  //   describe('googleApi', function() {

  //     beforeEach(function() {
  //       waitsFor(function() {
  //         return resolvedValue !== undefined;
  //       }, 500);
  //     });

  //   });

  //   describe('googleAuthApi', function() {
  //     var authorizedValue, gapiAuth;
  //     var gapi = {
  //       auth: {
  //         authorize: function() {}
  //       }
  //     };
  //     module(function($provide) {
  //       $provide.value('$window', gapi);
  //     });

  //     beforeEach(inject(function($injector) {
  //       googleAuthApi = $injector.get('googleAuthApi');
  //       gapiAuth = spyOn(gapi.auth, 'authorize')
  //         .andCallThrough();
  //     }));

  //   });
  // });

});
