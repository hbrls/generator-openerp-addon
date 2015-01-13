var angular = require('angular');


// common services are not necessary, e.g. NT_AMQ
// they should be normal modules, angular independent
var app = angular.module('<%= addon_short %>', [ '<%= addon_short %>.services' ]);


module.exports = app;
