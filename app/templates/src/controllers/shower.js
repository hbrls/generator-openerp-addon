var app = require('../bootstrap/app');
var shower_service = require('../services/shower');
var NT_AMQ = require('../services/nt_amq');


app.controller('ShowerCtrl', function ($scope, $rootScope, $timeout, Shower) {
  $rootScope.$on('mq:connected', function () {
  });

  function init() {
    NT_AMQ.listen('mq_message_type',
                  function (data) {
                    return data === true;
                  },
                  'shower_event_type');

    NT_AMQ.connect('amq_url', 'amq_username', 'amq_password', 'amq_channel', function (e, d) {
      $rootScope.$emit(e, d);
    });
  }


  init();
});
