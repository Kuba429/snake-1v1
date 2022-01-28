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
	}

	joinRoom() {
		const room = getRoomUrl();
		this.socket.emit("join", room);
		this.room = room;
	}
}

export default SocketHandler;

function getRoomUrl(): string {
	let room = window.location.pathname;
	room = room.split("/r/")[1];
	return room;
}
