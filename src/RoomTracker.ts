import { io } from ".";

class RoomTracker {
    rooms: object;
    constructor() {
        this.rooms = {};
    }
    getRoomStatus(roomId) {
        return io.sockets.adapter.rooms?.get(roomId)?.size;
    }
}
export default RoomTracker;
