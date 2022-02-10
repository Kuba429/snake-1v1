import { food, game, socket } from "./main";
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
	interval: any;
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
		this.interval = undefined;
		this.setupDirectionListeners();
	}
	getNextFrame() {
		game.loopNow = game.getTime();
		if (game.loopNow - game.loopThen > 1000 / game.fps) {
			game.loopThen = game.getTime();
			game.executeFrame();
		}
		game.interval = requestAnimationFrame(game.getNextFrame);
	}
	redraw() {
		this.clearCanvas();
		food.draw();
		this.player.draw();
		this.enemy.draw();
	}
	over() {
		console.log("game over");
		socket.socket.emit("gameOver");
	}
	start() {
		this.player.reset();
		this.interval = requestAnimationFrame(game.getNextFrame);
	}
	stop() {
		console.log("stop function");
		cancelAnimationFrame(this.interval);
	}
	executeFrame() {
		this.player.update();
		this.redraw();
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
		const restartButton = document.querySelector(".restartButton");
		restartButton?.addEventListener("click", () => {
			socket.socket.emit("ready");
		});
	}
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
