var angular = require('angular');

// just require the controllers you want
// controllers will require their own dependencies
var example_controller = require('./controllers/example');

angular.element(document).ready(function () {
  angular.bootstrap(document, ['<%= app_name %>']);
});
