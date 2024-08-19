import React, { useState } from 'react';
import axios from 'axios';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(null);

    const handleJoin = async () => {
        try {
            const response = await axios.post('/api/join-room', { roomCode });
            if (response.data.success) {
                // Redirect to the room, e.g., using React Router
                window.location.href = `/room/${roomCode}`;
            } else {
                setError('Invalid room code');
            }
        } catch (err) {
            setError('An error occurred while trying to join the room');
        }
    };

    return (
        <div className="join-room">
            <h1>Join Room</h1>
            <input
                type="text"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
            />
            <button onClick={handleJoin}>Join</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default JoinRoom;
