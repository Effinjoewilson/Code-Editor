import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const Room = () => {
    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="room">
            <h1>Welcome to the Room</h1>
        </div>
    );
};

export default Room;
