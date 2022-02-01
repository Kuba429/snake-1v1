export class Game {
	gridSize: number;
	canvas: HTMLCanvasElement;
	ctx: any;

	constructor() {
		this.gridSize = 30;
		this.canvas = document.querySelector("#mainCanvas")!;
		this.ctx = this.canvas.getContext("2d");
	}
}
