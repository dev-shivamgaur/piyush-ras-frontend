import {io} from "socket.io-client";

const socket = io(import.meta.env.VITE_CORS_ORIGIN,{
    //transports: ["polling", "websocket"] //production ka liya..
    transports: ["websocket"] //Personal project ka liya..
});

export {socket};