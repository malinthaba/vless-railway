const http = require('http');
const { createProxyServer } = require('http-proxy');

const proxy = createProxyServer({});
const server = http.createServer((req, res) => {
    // මෙතන තමයි VLESS ට්‍රැෆික් එක හරවන්නේ
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('VLESS Backend Active');
});

// WebSocket ඉල්ලීම් සඳහා
server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head, { target: 'http://127.0.0.1:3000' });
});

server.listen(process.env.PORT || 3000);
