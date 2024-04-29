const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

wss.on('connection', function connection(ws) {
	ws.on('message', function message(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
});

app.get('/', (req, res) => res.send('hello world s'));

server.listen(8080, () => console.log('listening on port 8080'));
