import { io, Socket } from "socket.io-client";

class SocketHandler {
	socket: Socket;
	room: string | undefined;
	username: string;
	constructor() {
		this.socket = io("localhost:5000");
		this.room = getRoomUrl();
		this.username = "guest";
		this.joinRoom();
		this.setupListeners();
	}

	joinRoom() {
		const room = getRoomUrl();
		this.socket.emit("join", room);
		this.room = room;
	}
	setupListeners() {
		this.socket.on("joinRejection", (data) => {
			alert(data);
		});
		this.socket.on("joined", () => {
			console.log("joined successfully");
		});
	}
}

export default SocketHandler;

function getRoomUrl(): string {
	let room = window.location.pathname;
	room = room.split("/r/")[1];
	return room;
}
