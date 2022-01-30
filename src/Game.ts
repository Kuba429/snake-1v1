interface Socket {
	on(event: string, callback: (data: any) => void);
	emit(event: string, data: any);
}
export class Game {
	roomId: string;
	sockets: Array<Socket>;
	gridSize: number;
	p1: Socket;
	p2: Socket;
	interval: typeof setInterval;
	fps: number;
	constructor(sockets: Array<Socket>, roomId: string) {
		this.roomId = roomId;
		this.sockets = sockets;
		this.gridSize = 30;
		this.p1 = this.sockets[0];
		this.p2 = this.sockets[1];
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
