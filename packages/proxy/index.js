// const http = require('http');
// const httpProxy = require('http-proxy');

// const proxy = httpProxy.createProxyServer({ changeOrigin: true });

// proxy.on('proxyReq', function(proxyReq, req, res, options) {
//   console.log('proxy.on.proxyReq', req);
// });

// proxy.on('proxyRes', function(proxyRes, req, res) {
//   console.log('proxy.on.proxyRes');
//   proxyRes.headers['Access-Control-Allow-Origin'] = '*';
// });

// const server = http.createServer(function (req, res) {
//   proxy.web(req, res, { target:'https://httpbin.org' });
// });

// server.listen(57386);
// console.log("listening on port 57386");

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/',
  function (req, res, next) {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Origin', '*');
      return res.send();
    }
    
    res.header('Access-Control-Allow-Origin', '*');

    next();
  },
  createProxyMiddleware({ target: 'https://httpbin.org', changeOrigin: true, router: function(req) {
    const target = req.headers['x-forwarded-proto'] + '://' + req.headers['x-forwarded-host'];
    return target;
  }})
);
// app.listen(57386);


module.exports = app;
