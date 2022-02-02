import { socket } from "./main";
import { getOpposite, Snake } from "./Snake";
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
	player: Snake;
	opponent: Snake;
	constructor() {
		this.gridSize = 30;
		this.canvas = <HTMLCanvasElement>document.querySelector("#mainCanvas");
		this.ctx = this.canvas.getContext("2d");
		this.cellSize = this.canvas.width / this.gridSize;
		this.player = new Snake("#000000", 10, 4);
		this.opponent = new Snake("#f0f0f0", 28, 20);
		this.setupDirectionListeners();
	}

	executeFrame() {
		this.clearCanvas();
		this.player.update();
		this.opponent.update();
	}

	setupDirectionListeners() {
		const arrows = document.querySelectorAll<HTMLElement>(".arrow");
		arrows.forEach((arrow) => {
			arrow.addEventListener("click", () => {
				const arrowDirection: string = arrow.dataset.direction!;
				if (
					this.player.direction != this.player.queue &&
					this.player.direction != getOpposite(arrowDirection!) &&
					this.player.ready
				) {
					this.changeDirection(arrowDirection);
				}
				this.player.queue = arrowDirection;
				this.player.ready = false;
			});
		});

		addEventListener("keydown", (e) => {
			const element: HTMLElement = document.querySelector(
				`.arrow.${e.code}`
			)!;
			element && element.click();
		});
	}
	changeDirection(newDirection: string) {
		this.player.direction = newDirection;
		console.log(newDirection);
	}
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
