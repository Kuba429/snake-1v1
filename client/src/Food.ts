import { game } from "./main";

export class Food {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw() {
		game.ctx!.fillStyle = "#00dd00";
		game.ctx!.fillRect(this.x, this.y, game.cellSize, game.cellSize);
	}
}
