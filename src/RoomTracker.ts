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
        const size: number = io.sockets.adapter.rooms?.get(roomId)?.size || 0;
        this.rooms[roomId] = size;
        this.clearEmptyRooms();
        return size;
    }
    clearEmptyRooms() {
        for (let item in this.rooms) {
            if (this.rooms[item] < 1) {
                delete this.rooms[item];
            }
        }
    }
}
export default RoomTracker;
