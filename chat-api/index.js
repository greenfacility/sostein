const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => console.log('user disconnected'));
});

app.use((req, res, next) => {
	res.json({ success: true, msg: 'Api is ready' });
});

server.listen(PORT, () => console.log(`Server loaded on https://localhost:${PORT}`));

//Run app, then load http://localhost:8000 in a browser to see the output.
