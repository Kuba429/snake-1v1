import { game } from "./main";
interface block {
	x: number;
	y: number;
}
export class Snake {
	color: string;
	direction: string;
	x: number;
	y: number;
	ready: boolean;
	queue: string;
	tail: Array<block>;
	isOnline: boolean;
	constructor(color: string, x: number, y: number) {
		this.color = color;
		this.direction = "ArrowUp";
		this.x = x;
		this.y = y;
		this.ready = true;
		this.queue = this.direction;
		this.tail = [
			{ x: this.x, y: this.y },
			{ x: this.x, y: this.y },
		];
		this.isOnline = true;
	}
	update() {
		this.move();
		this.draw();
	}
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
				this.y -= game.cellSize;
				break;
			case "ArrowDown":
				this.y += game.cellSize;
				break;
			case "ArrowRight":
				this.x += game.cellSize;
				break;
			case "ArrowLeft":
				this.x -= game.cellSize;
				break;
			default:
				return;
		}
		const limit = (game.gridSize - 1) * game.cellSize;
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

		if (
			this.queue != this.direction &&
			getOpposite(this.queue) != this.direction
		) {
			game.changeDirection(this.queue);
		}
		this.ready = true;
		this.draw();
		this.detectCollision();
	}
	draw() {}
	detectCollision() {}
}

export const getOpposite = (direction: string) => {
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
