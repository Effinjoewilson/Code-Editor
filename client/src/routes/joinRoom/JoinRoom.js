import React, { useState } from 'react';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');

    const handleJoin = () => {
        console.log(`Joining room: ${roomCode}`);
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
        </div>
    );
};

export default JoinRoom;
