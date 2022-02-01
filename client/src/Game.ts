interface cordData {
	x: number;
	y: number;
	tail: Array<cell>;
}
interface playersCords {
	[key: string]: cordData;
}
interface cell {
	x: number;
	y: number;
}
export class Game {
	gridSize: number;
	canvas: HTMLCanvasElement;
	ctx; // type assigned automatically
	cellSize: number;
	constructor() {
		this.gridSize = 30;
		this.canvas = <HTMLCanvasElement>document.querySelector("#mainCanvas");
		this.ctx = this.canvas.getContext("2d");
		this.cellSize = this.canvas.width / this.gridSize;
	}
	update(data: playersCords) {
		this.clearCanvas();
		this.draw(data.you, false);
		this.draw(data.enemy, true);
	}
	draw(data: cordData, isEnemy: boolean) {
		this.ctx!.fillStyle = isEnemy ? "#ffffff" : "#000000";
		//head
		const rectCords: [number, number, number, number] = [
			data.x * this.cellSize,
			data.y * this.cellSize,
			this.cellSize,
			this.cellSize,
		];
		this.ctx?.fillRect(...rectCords);
		//tail
		data.tail.forEach((block) => {
			const rectCords: [number, number, number, number] = [
				block.x * this.cellSize,
				block.y * this.cellSize,
				this.cellSize,
				this.cellSize,
			];
			this.ctx?.fillRect(...rectCords);
		});
	}
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
