const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.post('/api/create-room', (req, res) => {
    const roomCode = generateRoomCode();
    res.json({ roomCode });
});

app.post('/api/join-room', (req, res) => {
    const { roomCode } = req.body;
    if (validateRoomCode(roomCode)) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomCode) => {
        socket.join(roomCode);
        console.log(`User joined room: ${roomCode}`);
    });

    socket.on('sendMessage', (message, roomCode) => {
        io.to(roomCode).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function validateRoomCode(code) {
    return code.length === 6;
}