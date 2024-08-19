import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomCode } = useParams();

    useEffect(() => {
        const socket = io();

        socket.emit('joinRoom', roomCode);

        socket.on('connect', () => {
            console.log('Connected to room:', roomCode);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomCode]);

    return (
        <div className="room">
            <h1>Room: {roomCode}</h1>
            <p>Collaborate with others in real-time!</p>
        </div>
    );
};

export default Room;
