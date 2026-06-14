const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'ws://bb.7ir.me:49647',
  ws: true,
  changeOrigin: true
});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'http://bb.7ir.me:49647' });
});

// Handle WebSocket upgrade requests
server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
