const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com',
      changeOrigin: true,
    })
  );
};