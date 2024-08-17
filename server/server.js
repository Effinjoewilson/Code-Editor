const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

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

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function validateRoomCode(code) {
    return code.length === 6; // Basic validation
}


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
