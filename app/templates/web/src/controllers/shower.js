var app = require('../bootstrap/app');
var shower_service = require('../services/shower');
var nts_mq_service = require('../services/nts_mq');


app.controller('ShowerCtrl', function ($scope, $rootScope, $timeout, Shower, NTS_MQ) {
  $rootScope.$on('mq:connected', function () {
  });

  function init() {
    NTS_MQ.listen('mq_message_type',
                  function (data) {
                    return data === true;
                  },
                  'shower_event_type');
  }


  init();
});

module.exports = {};
