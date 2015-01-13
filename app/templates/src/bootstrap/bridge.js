// Placeholders
var _oe_instance;
var _oe_this;

var adapters_cached = {};


module.exports = {
  init: function (oe_instance, oe_this) {
    _oe_instance = oe_instance;
    _oe_this = oe_this;
  },

  getAdapter: function (model_name) {
    if (!adapters_cached[model_name]) {
      var adapter = new _oe_instance.web.Model(model_name);
      adapters_cached[model_name] = adapter;
    }

    return adapters_cached[model_name];
  },

  doAction: function (config) {
    _oe_this.do_action(config);
  }
};
