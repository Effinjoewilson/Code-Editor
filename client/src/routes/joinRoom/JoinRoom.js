import React, { useState } from 'react';
import './JoinRoom.css';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomID.trim()) {
      navigate(`/room/${roomID}`);
    }
  };

  return (
    <div className="joinRoom-container">
      <h1>Join a Room</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
        className="joinRoom-input"
      />
      <button onClick={handleJoinRoom} className="joinRoom-button">
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
