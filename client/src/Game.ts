import { game, socket } from "./main";
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
		const randomNumber = Math.floor(Math.random() * 30);
		this.player = new Snake("#000000", randomNumber, randomNumber);
		this.enemy = new Snake("#f0f0f0", -randomNumber, -randomNumber);
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
		this.enemy.draw();
		socket.socket.emit("enemyUpdate", {
			x: this.player.x,
			y: this.player.y,
			tail: this.player.tail,
		});
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
					this.player.direction = arrowDirection;
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
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
