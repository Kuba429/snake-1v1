import { food, game, info, score, socket } from "./main";
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
		this.player = new Snake("#F5EAEA", randomNumber, randomNumber);
		this.enemy = new Snake("#E05D5D", -randomNumber, -randomNumber);
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
	over(message: string = "Game Over") {
		console.log(message);
		socket.socket.emit("gameOver", message);
	}
	start() {
		this.player.reset();
		this.interval = requestAnimationFrame(game.getNextFrame);
		info.hideScreen();
	}
	stop() {
		console.log("stop function");
		cancelAnimationFrame(this.interval);
		info.showScreen();
	}
	executeFrame() {
		score.updateScores();
		this.player.update();
		food.detectCollision();
		this.redraw();
		socket.socket.emit("enemyUpdate", {
			x: this.player.x,
			y: this.player.y,
			tail: this.player.tail,
			username: socket.username,
		});
	}
	getTime() {
		return new Date().getTime();
	}
	setupDirectionListeners() {
		//controls
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
		// stop the game when tab loses focus
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "hidden") {
				game.over(`${score.opponentUsername} won!`);
			}
		});
	}
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawGrid();
	}
	drawGrid() {
		this.ctx!.strokeStyle = "#4d4646";
		for (let i = 1; i < this.gridSize; i++) {
			this.ctx!.moveTo(i * this.cellSize, 0);
			this.ctx!.lineTo(i * this.cellSize, this.cellSize * this.gridSize);

			this.ctx!.moveTo(0, i * this.cellSize);
			this.ctx!.lineTo(this.cellSize * this.gridSize, i * this.cellSize);
		}

		this.ctx!.stroke();
	}
}
