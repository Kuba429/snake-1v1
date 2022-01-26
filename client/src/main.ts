import { io, Socket } from "socket.io-client";
import "./styles/index.scss";

const socket: Socket = io("localhost:5000");
socket.on("test", (data) => {
    console.log(data);
});
