import { Player } from "./Player";

export interface Socket {
	on(event: string, callback: (data: any) => void);
	emit(event: string, data: any);
}
export class Game {
	roomId: string;
	sockets: Array<Socket>;
	gridSize: number;
	p1: Player;
	p2: Player;
	interval: ReturnType<typeof setTimeout>;
	fps: number;
	constructor(sockets: Array<Socket>, roomId: string) {
		this.roomId = roomId;
		this.sockets = sockets;
		this.gridSize = 30;
		this.p1 = new Player(this.sockets[0], 1, 10, this.gridSize);
		this.p2 = new Player(this.sockets[1], 29, 10, this.gridSize);
		this.interval = undefined;
		this.fps = 5;
		this.setupListeners();
		this.start();
	}
	start() {
		this.interval = setInterval(() => {
			this.executeFrame();
		}, 1000 / this.fps);
	}
	executeFrame() {
		this.p1.move();
		this.p2.move();

		const p1Pos = { x: this.p1.x, y: this.p1.y, tail: this.p1.tail };
		const p2Pos = { x: this.p2.x, y: this.p2.y, tail: this.p2.tail };
		this.p1.socket.emit("update", { you: p1Pos, enemy: p2Pos });
		this.p2.socket.emit("update", { you: p2Pos, enemy: p1Pos });
	}
	setupListeners() {
		this.sockets.forEach((socket) => {
			//listeners here
		});
	}
}
