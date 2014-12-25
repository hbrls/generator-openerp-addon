var angular = require('angular');
// dependencies
var services = require('./services');
// common services if necessary, e.g. MQ
var app = angular.module('<%= addon_short %>', ['<%= addon_short %>.services', 'nt.services']);


module.exports = app;
