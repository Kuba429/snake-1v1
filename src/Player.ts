// this class is based on a class from my singleplayer version of snake
// https://github.com/Kuba429/snake
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
		gridSize = gridSize;
		this.direction = "ArrowUp";
		this.ready = true;
		this.queue = this.direction;
		this.tail = [
			{ x: this.x, y: this.y },
			{ x: this.x, y: this.y },
		];
	}
	setup() {}
	move() {
		// tail
		this.tail[this.tail.length - 1].x = this.x;
		this.tail[this.tail.length - 1].y = this.y;
		for (let i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = { ...this.tail[i + 1] };
		}
		// head

		switch (this.direction) {
			case "ArrowUp":
				this.y -= 1;
				break;
			case "ArrowDown":
				this.y += 1;
				break;
			case "ArrowRight":
				this.x += 1;
				break;
			case "ArrowLeft":
				this.x -= 1;
				break;
			default:
				return;
		}
		const limit = this.gridSize - 1;
		if (this.x > limit) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = limit;
		}
		if (this.y > limit) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = limit;
		}

		if (getOpposite(this.queue) != this.direction) {
			this.direction = this.queue;
		}
	}
}

const getOpposite = (direction: string) => {
	let toReturn: string = undefined!;
	switch (direction) {
		case "ArrowUp":
			toReturn = "ArrowDown";
			break;
		case "ArrowDown":
			toReturn = "ArrowUp";
			break;
		case "ArrowLeft":
			toReturn = "ArrowRight";
			break;
		case "ArrowRight":
			toReturn = "ArrowLeft";
			break;
		default:
			break;
	}

	return toReturn;
};
