export interface Socket {
	on(event: string, callback: (data: any) => void);
	emit(event: string, data?: any);
	id: string;
	username: string;
	isReady: boolean;
}
export class Game {
	roomId: string;
	sockets: Array<Socket>;
	p1: Socket;
	p2: Socket;
	fps: number;
	constructor(sockets: Array<Socket>, roomId: string) {
		this.roomId = roomId;
		this.sockets = sockets;
		this.p1 = this.sockets[0];
		this.p2 = this.sockets[1];
		this.fps = 7;
		this.setupListeners();

		this.sockets.forEach((socket) => socket.emit("startGame"));
	}
	setupListeners() {
		this.sockets.forEach((socket) => {
			//listeners here
			socket.on("disconnect", () => {
				// rooms are being reset this way for now
				// will probably change it later
				this.sockets.forEach((socket) => {
					socket.emit("stopGame");
				});
				this.sockets = [];
				this.p1 = undefined;
				this.p2 = undefined;
			});

			socket.on("enemyUpdate", (data) => {
				const otherPlayer = this.sockets.filter(
					(item) => item.id !== socket.id
				);
				otherPlayer.forEach((item) => {
					item.emit("update", data);
				});
			});
			socket.on("gameOver", () => {
				this.sockets.forEach((socket) => {
					socket.isReady = false;
					socket.emit("stopGame");
				});
			});
			socket.on("ready", () => {
				socket.isReady = true;
				const readySockets = this.sockets.filter(
					(s) => s.isReady == true
				);
				if (readySockets.length >= 2) {
					this.sockets.forEach((s) => {
						s.emit("startGame");
					});
				}
			});
		});
	}
}
