const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:8001', 
			changeOrigin: true,
		})
	);
};