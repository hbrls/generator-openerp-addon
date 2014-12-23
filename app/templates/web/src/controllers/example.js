var app = require('../bootstrap/app');
var example_service = require('../services/example');


app.controller('ExampleCtrl', function ($scope, $rootScope, $timeout, Example) {
  $rootScope.$on('example:event', function () {
  });

  function init() {
  }


  init();
});

module.exports = {};
