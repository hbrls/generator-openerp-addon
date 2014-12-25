var services = require('../bootstrap/services');


function _enhance(data) {
  for (var i = 0; i < data.length; i++) {
    //
  }
}


services
  .factory('Shower', function ($http, $q) {
    return {
      api_call: function () {
        $http.post('/api/nt.<%= addon_short %>.rest/js_api_call.api', JSON.stringify({}))
          .success(function (data, status, headers, config) {
            var data = result.data;
          })
          .error(function (data, status, headers, config) {
            console.error(err);
          });
      }
    };
  });


module.exports = {};
