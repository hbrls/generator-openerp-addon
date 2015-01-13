var stomp = require('stomp');


var client;
var emit = function (event, data) {
  console.log(event, data);
};

var CHANNEL;
var SERVER;
var USERNAME;
var PASSWORD;
var retry_count = 0;

var DISPATCHERS = [];

function _dispatcher(message) {
  var msg = JSON.parse(message.body);

  var p;
  for (var i = 0; i < DISPATCHERS.length; i++) {
    p = DISPATCHERS[i];
    if (msg.message_type === p.t) {
      if (p.f) {
        if (p.f(msg.data)) {
          emit(p.e, msg.data);
        }
      } else {
        emit(p.e, msg.data);
      }
    }
  }
}


function make_client() {
  var client = stomp.client(SERVER, 'v11.stomp');

  // 服务端对 heartbeat 的设定好像是有问题的
  // 当客户端去 ping 的时候，服务端并不总能 pong
  // 因此对 js 的 heartbeat 实现做改进是没什么意义的，还不如一旦断开就重连
  client.heartbeat.outgoing = 0;
  client.heartbeat.incoming = 0;

  // DEBUG:
  client.debug = function (debug_log) {
    console.debug(debug_log);
  };

  client.connect(USERNAME, PASSWORD,
    function (frame) {
      // console.log(frame);

      client.subscribe(CHANNEL, _dispatcher);

      if (retry_count === 0) {
        emit('mq:connected', CHANNEL);
      } else {
        emit('mq:reconnected');
      }

      retry_count = 0;
    },
    function (err) {
      // 不管错误是什么，通通重连
      console.debug(err);

      if (retry_count < 3) {
        retry_count += 1;
        make_client();
      } else {
        retry_count = 0;
        emit('mq:disconnected');
      }
    });
}


module.exports = {
  connect: function (server, username, password, channel, emit_func) {
    SERVER = server;
    USERNAME = username;
    PASSWORD = password;
    CHANNEL = channel;

    emit = emit_func;

    make_client();
  },

  listen: function (message_type, filter, event_name) {
    if (arguments.length === 2) {
      event_name = filter;
      filter = null;
    }

    DISPATCHERS.push({
      t: message_type,
      f: filter,
      e: event_name
    });
  }
};
