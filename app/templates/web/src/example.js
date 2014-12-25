var angular = require('angular');

// just require the controllers you want
// controllers will require their own dependencies
var shower_controller = require('./controllers/shower');

angular.element(document).ready(function () {
  angular.bootstrap(document, ['<%= addon_short %>']);
});
