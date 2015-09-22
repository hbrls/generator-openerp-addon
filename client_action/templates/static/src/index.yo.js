var <%= widget_obj %>WidgetAPP = require('./<%= widget_name %>/app');
var <%= widget_obj %>WidgetNID = require('./<%= widget_name %>/nid');


var old_def = null;
if (openerp.<%= addon_name %>) {
  old_def = openerp.<%= addon_name %>;
}


openerp.<%= addon_name %> = function (instance) {
  instance.<%= addon_name %>.<%= widget_obj %>Widget = instance.web.Widget.extend({
    template: '<%= addon_name %>_<%= widget_name %>',
  });

  instance.web.client_actions.add('<%= addon_name %>_<%= widget_name %>', 'instance.<%= addon_name %>.MarketingActivityNavWidget');

  if (old_def) {
    old_def(instance);
  }
};
