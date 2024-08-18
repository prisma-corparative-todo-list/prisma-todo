


import { io } from 'socket.io-client';


export const socket = io("http://localhost:3000", {
    autoConnect: false,
    extraHeaders: {
        Cookies: document.cookie
    }
})