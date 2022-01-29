import { Response, Request } from "express";
import path = require("path");
import cors = require("cors");
import RoomTracker from "./RoomTracker";
import { Game } from "./Game";

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
	socket.on("disconnect", () => {});
	let username: string = "guest";
	let currentRoomId: string;
	socket.on("usernameChange", (data: string) => {
		username = data;
	});

	socket.on("join", async (data: string) => {
		if (roomTracker.getRoomStatus(data) < 2) {
			socket.join(data);
			currentRoomId = data;
			socket.emit("joined");
			if (roomTracker.getRoomStatus(data) == 2) {
				let socketsInRoom = await io.in(data).fetchSockets();
				new Game(socketsInRoom, data);
			}
		} else {
			socket.emit("joinRejection", "Room full");
		}
	});
	socket.on("getRoomStatus", (data: string) => {
		roomTracker.getRoomStatus(data);
	});
});
