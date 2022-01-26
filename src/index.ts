import RoomTracker from "./RoomTracker";

const express = require("express");
const app = express();
const PORT: number = 5000;
const { Server } = require("socket.io");

app.use(express.static("client/dist"));

const server = app.listen(PORT, () => {
    console.log("server running at port " + PORT);
});

export const io = new Server(server);
const roomTracker = new RoomTracker();
io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
    let username: string = "guest";
    let room: string;
    socket.on("usernameChange", (data: string) => {
        username = data;
    });

    socket.on("join", (data: string) => {
        socket.join(data);
        room = data;
        console.log(`user ${username} joined ${data}`);
    });
    socket.on("getRoomStatus", (data: string) => {
        roomTracker.getRoomStatus(data);
    });
});
