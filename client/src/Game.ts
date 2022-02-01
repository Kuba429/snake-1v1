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
	update(data: any) {
		this.clearCanvas();
		this.draw(data.you);
		this.draw(data.enemy);
	}
	draw(data: any) {
		this.ctx!.fillStyle = "#ffffff";
		const rectCords: [number, number, number, number] = [
			data.y * this.cellSize,
			data.x * this.cellSize,
			this.cellSize,
			this.cellSize,
		];
		this.ctx?.fillRect(...rectCords);
	}
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
