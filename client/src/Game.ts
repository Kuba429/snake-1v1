import { socket } from "./main";
import { Snake } from "./Snake";
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
	update(data: playersCords) {
		this.clearCanvas();
		this.draw(data.you, false);
		this.draw(data.enemy, true);
	}
	executeFrame() {
		this.clearCanvas();
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
	setupDirectionListeners() {
		const arrows = document.querySelectorAll<HTMLElement>(".arrow");
		arrows.forEach((arrow) => {
			arrow.addEventListener("click", () => {
				socket.setDirection(arrow.dataset.direction!);
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
		console.log(newDirection);
	}
	clearCanvas() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
