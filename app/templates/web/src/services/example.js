var services = require('../bootstrap/services');


function _enhance(data) {
  for (var i = 0; i < data.length; i++) {
    //
  }
}


services
  .factory('Example', function ($http, $q) {
    return {
      api_call: function () {
        $http.post('/api/nt.<%= app_name %>.rest/js_api_call.api', JSON.stringify({}))
          .success(function (result) {
            var data = result.data;
          })
          .error(function (err) {
            console.error(err);
          });
      }
    };
  });


module.exports = {};
