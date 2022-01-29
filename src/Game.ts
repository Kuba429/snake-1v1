import { SocketType } from "dgram";
import { Socket } from "socket.io";

export class Game {
	roomId: string;
	sockets: Array<SocketType>;
	p1: SocketType;
	p2: SocketType;
	constructor(sockets: Array<SocketType>, roomId: string) {
		this.roomId = roomId;
		this.sockets = sockets;
		this.p1 = this.sockets[0];
		this.p2 = this.sockets[1];
	}
	setupListeners() {
		this.sockets.forEach((socket) => {
			//listeners here
		});
	}
}
