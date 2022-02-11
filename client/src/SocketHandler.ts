import { io, Socket } from "socket.io-client";
import { food, game } from "./main";

class SocketHandler {
	socket: Socket;
	room: string | undefined;
	username: string;
	constructor() {
		this.socket = io();
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
	setDirection(direction: string) {
		this.socket.emit("changeDirection", direction);
	}
	setupListeners() {
		this.socket.on("startGame", (newFood) => {
			if (newFood) {
				[food.x, food.y] = [newFood.x, newFood.y];
			}
			game.start();
		});
		this.socket.on("stopGame", () => {
			console.log("stop game socket event");
			game.stop();
		});
		this.socket.on("joinRejection", (data) => {
			alert(data);
		});
		this.socket.on("joined", () => {
			console.log("joined successfully");
		});
		this.socket.on("update", ({ x, y, tail }) => {
			game.enemy.x = x;
			game.enemy.y = y;
			game.enemy.tail = tail;
			game.redraw();
			game.enemy.detectCollision();
		});
		this.socket.on("newFood", (newFood) => {
			food.x = newFood.x;
			food.y = newFood.y;
		});
	}
}

export default SocketHandler;

function getRoomUrl(): string {
	let room = window.location.pathname;
	room = room.split("/r/")[1];
	return room;
}
