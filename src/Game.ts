export interface Socket {
	on(event: string, callback: (data: any) => void);
	emit(event: string, data: any);
	id: string;
	username: string;
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
	}
	setupListeners() {
		this.sockets.forEach((socket) => {
			//listeners here
			socket.on("enemyUpdate", (data) => {
				const otherPlayer = this.sockets.filter(
					(item) => item.id !== socket.id
				);
				otherPlayer.forEach((item) => {
					item.emit("update", data);
				});
			});
		});
	}
}
