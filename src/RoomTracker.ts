import { io } from ".";

class RoomTracker {
	rooms: object;
	constructor() {
		this.rooms = {};
	}
	getRoomStatus(roomId: string): number {
		if (!roomId) {
			return 0;
		}
		return io.sockets.adapter.rooms?.get(roomId)?.size || 0;
	}
	getAllRoomsStatus(): object {
		const activeRooms: string[] = this.getActiveRooms();
		let status: object = {};
		activeRooms.forEach((item) => {
			status[item] = this.getRoomStatus(item);
		});
		return status;
	}
	getActiveRooms(): string[] {
		let rooms = io.sockets.adapter.rooms.keys();
		rooms = Array.from(rooms);
		rooms = rooms.filter((item: string) => {
			return item.length < 16;
		});
		return rooms;
	}
}
export default RoomTracker;
