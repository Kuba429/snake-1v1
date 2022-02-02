import { Socket } from "./Game";
interface cell {
	x: number;
	y: number;
}
export class Player {
	socket: Socket;
	x: number;
	y: number;
	gridSize: number;
	direction: string;
	ready: boolean;
	queue: string;
	tail: cell[];
	constructor(socket: Socket, x: number, y: number, gridSize: number) {
		this.socket = socket;
		this.x = x;
		this.y = y;
		this.gridSize = gridSize;
		this.direction = "ArrowUp";
		this.ready = true;
		this.queue = this.direction;
		this.tail = [
			{ x: this.x, y: this.y },
			{ x: this.x, y: this.y },
		];
		this.setupListeners();
	}
	setupListeners() {
		this.socket.on("changeDirection", (data) => {
			console.log(data);
		});
	}
}
