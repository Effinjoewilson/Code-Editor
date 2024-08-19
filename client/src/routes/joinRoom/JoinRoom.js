import React, { useState } from 'react';
import axios from 'axios';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(null);

    // Handle joining an existing room
    const handleJoinRoom = async () => {
        try {
            const response = await axios.post('/api/join-room', { roomCode });
            if (response.data.success) {
                // Redirect to the room page if room code is valid
                window.location.href = `/room/${roomCode}`;
            } else {
                setError('Invalid room code. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while trying to join the room.');
        }
    };

    // Handle creating a new room
    const handleCreateRoom = async () => {
        try {
            const response = await axios.post('/api/create-room');
            const { roomCode } = response.data;
            // Redirect to the new room page after creation
            window.location.href = `/room/${roomCode}`;
        } catch (err) {
            setError('An error occurred while creating the room.');
        }
    };

    return (
        <div className="join-room">
            <h1>Join or Create a Room</h1>
            
            {/* Join Room Section */}
            <input
                type="text"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            
            {/* Create Room Section */}
            <p>OR</p>
            <button onClick={handleCreateRoom}>Create a New Room</button>

            {/* Display any errors */}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default JoinRoom;
