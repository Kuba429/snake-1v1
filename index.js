const express = require("express");
const app = express();
const PORT = 5000;
const { Server } = require("socket.io");

app.use(express.static("client/dist"));

const server = app.listen(PORT, () => {
    console.log("server running at port " + PORT);
});

const io = new Server(server);

io.on("connection", (socket) => {
    io.to(socket).emit("test", "test");
});
