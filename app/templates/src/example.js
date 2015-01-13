var openerp = require('openerp');
// init the bridge to access the openerp instance
var openerp_bridge = require('./bootstrap/bridge');
// controllers on page
var app = require('./bootstrap/app');
var shower_controller = require('./controllers/shower');


openerp.<%= addon_name %> = function (instance) {
  instance.<%= addon_name %>.ca_EXAMPLE_FUNCTION = instance.web.Widget.extend({
    template: '<%= addon_name %>.ca_EXAMPLE_FUNCTION_tpl',

    init: function () {
      this._super.apply(this, arguments);
    },

    start : function() {
      openerp_bridge.init(instance, this);

      // ** for web site, only this is required
      angular.element(document).ready(function () {
        var $div = angular.element('.nt-<%= addon_short %>');
        angular.bootstrap($div, ['<%= addon_short %>']);
      });
      // ** for web site, only this is required

      return this._super();
    },
  });

  instance.web.client_actions.add('<%= addon_name %>.ca_EXAMPLE_FUNCTION', 'instance.<%= addon_name %>.ca_EXAMPLE_FUNCTION');
};
