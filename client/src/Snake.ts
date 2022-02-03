// this class is based on a class from my singleplayer version of snake
// https://github.com/Kuba429/snake
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
		this.detectCollision();
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
		const limit = game.gridSize - 1;
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
			this.direction = this.queue;
		}
		this.ready = true;
	}
	draw() {
		//head
		const rectCords: [number, number, number, number] = [
			this.x * game.cellSize,
			this.y * game.cellSize,
			game.cellSize,
			game.cellSize,
		];
		game.ctx?.fillRect(...rectCords);
		// tail
		this.tail.forEach((block) => {
			const rectCords: [number, number, number, number] = [
				block.x * game.cellSize,
				block.y * game.cellSize,
				game.cellSize,
				game.cellSize,
			];
			game.ctx?.fillRect(...rectCords);
		});
	}
	detectCollision() {
		const headPosition: string = JSON.stringify({ x: this.x, y: this.y });
		const playerHeadPosition: string = JSON.stringify({
			x: game.player.x,
			y: game.player.y,
		});
		const enemyHeadPosition: string = JSON.stringify({
			x: game.enemy.x,
			y: game.enemy.y,
		});
		if (playerHeadPosition == enemyHeadPosition) game.over();
		const tails: Array<block> = [...game.player.tail, ...game.enemy.tail];
		tails.forEach((block: block) => {
			if (JSON.stringify(block) == headPosition) game.over();
		});
	}
	addToTail() {
		if (this.tail.length < 1) {
			this.tail.unshift({
				x: this.x,
				y: this.y,
			});
		} else {
			let lastBlock = this.tail[this.tail.length - 1];
			this.tail.unshift({ ...lastBlock });
		}
	}
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
