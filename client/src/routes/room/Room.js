import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './Room.css';

const socket = io.connect('http://localhost:5000');

const Room = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState('');

  useEffect(() => {
    // Join the room on mount
    socket.emit('join_room', roomId);

    // Listen for code updates from other clients
    socket.on('receive_code', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleCodeChange = (e) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);
    // Emit the code to the server
    socket.emit('send_code', { roomId, code: updatedCode });
  };

  return (
    <div className="room-container">
      <h2>Room: {roomId}</h2>
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="code-editor"
      />
    </div>
  );
};

export default Room;
