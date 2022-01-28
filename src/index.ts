import { Response, Request } from "express";
import path = require("path");
import cors = require("cors");
import RoomTracker from "./RoomTracker";

const express = require("express");
const app = express();
const PORT: number = 5000;
const { Server } = require("socket.io");
app.use(cors());
app.use(express.static("client/dist"));
app.get("/r/*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../", "client", "dist", "game.html"));
});

app.get("/activeRooms", (req: Request, res: Response) => {
	res.send(roomTracker.getAllRoomsStatus());
});

const server = app.listen(PORT, () => {
	console.log("server running at port " + PORT);
});

export const io = new Server(server);
export const roomTracker = new RoomTracker();
io.on("connection", (socket) => {
	// console.log("client connected");
	socket.on("disconnect", () => {
		// console.log("client disconnected");
	});
	let username: string = "guest";
	let currentRoomId: string;
	socket.on("usernameChange", (data: string) => {
		username = data;
	});

	socket.on("join", (data: string) => {
		socket.join(data);
		currentRoomId = data;
	});
	socket.on("getRoomStatus", (data: string) => {
		roomTracker.getRoomStatus(data);
	});
});
