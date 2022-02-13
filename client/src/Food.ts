import { game, socket } from "./main";

export class Food {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw() {
		game.ctx!.fillStyle = "#7FCD91";
		const rectCords: [number, number, number, number] = [
			this.x * game.cellSize,
			this.y * game.cellSize,
			game.cellSize,
			game.cellSize,
		];
		game.ctx!.fillRect(...rectCords);
	}
	detectCollision() {
		if (this.x == game.player.x && this.y == game.player.y) {
			this.eat();
		}
	}
	eat() {
		socket.socket.emit("foodEaten");
		game.player.addToTail();
	}
}
