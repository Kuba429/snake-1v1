import { game } from "./main";
import { getOpposite, Snake } from "./Snake";
export class Game {
	gridSize: number;
	canvas: HTMLCanvasElement;
	ctx; // type assigned automatically
	cellSize: number;
	player: Snake;
	enemy: Snake;
	loopNow: number;
	loopThen: number;
	fps: number;
	constructor() {
		this.gridSize = 30;
		this.canvas = <HTMLCanvasElement>document.querySelector("#mainCanvas");
		this.ctx = this.canvas.getContext("2d");
		this.cellSize = this.canvas.width / this.gridSize;
		this.player = new Snake("#000000", 10, 4);
		this.enemy = new Snake("#f0f0f0", 28, 20);
		this.fps = 7;
		this.loopNow = this.getTime();
		this.loopThen = this.getTime();
		this.setupDirectionListeners();
	}
	getNextFrame() {
		game.loopNow = game.getTime();
		if (game.loopNow - game.loopThen > 1000 / game.fps) {
			game.loopThen = game.getTime();
			game.executeFrame();
		}
		requestAnimationFrame(game.getNextFrame);
	}
	executeFrame() {
		this.clearCanvas();
		this.player.update();
		this.enemy.update();
	}
	getTime() {
		return new Date().getTime();
	}
	setupDirectionListeners() {
		const arrows = document.querySelectorAll<HTMLElement>(".arrow");
		arrows.forEach((arrow) => {
			arrow.addEventListener("click", () => {
				const arrowDirection: string = arrow.dataset.direction!;
				if (
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
