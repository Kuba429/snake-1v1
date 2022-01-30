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
	interval: typeof setInterval;
	fps: number;
	constructor(sockets: Array<Socket>, roomId: string) {
		this.roomId = roomId;
		this.sockets = sockets;
		this.gridSize = 30;
		this.p1 = new Player(this.sockets[0], 0, 2, this.gridSize);
		this.p2 = new Player(this.sockets[1], 0, 2, this.gridSize);
		this.interval = undefined;
		this.fps = 1;
		this.setupListeners();
		this.start();
	}
	start() {
		this.sockets.forEach((socket) => {});
	}
	setupListeners() {
		this.sockets.forEach((socket) => {
			//listeners here
		});
	}
}
