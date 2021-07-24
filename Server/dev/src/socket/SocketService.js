"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const Constance_1 = require("../pskg/Constance");
const User_1 = require("./User");
class SocketService {
    constructor(io, socket, prisma) {
        this.io = io;
        this.socket = socket;
        this.prisma = prisma;
        this.userSocket = new User_1.UserSocket(this.prisma);
    }
    async updateUserSocketId() {
        return await this.userSocket.updateSocketId(this.socket.handshake.headers["authrization"], this.socket.id);
    }
    async emitUpdateStatusUser(user) {
        const friendIds = await this.userSocket.getFriendOfUserId(user.id);
        friendIds.map((friendId) => {
            this.io.to(friendId).emit("updateStatusAfterLogin", user);
        });
        this.socket.emit("updateOwnerStatusLogin", user);
    }
    // receive emit messge client
    receiviveMessageAndEmitMessage() {
        this.socket.on(Constance_1.SEND_MESSAGE, async (payload) => {
            const message = await this.userSocket.createMessage(payload);
            this.sendToMessageAfterSendMessage(message);
            this.io.to(payload.socketFriendId).emit(Constance_1.RECEIVE_MESSAGE, message);
        });
    }
    sendToMessageAfterSendMessage(message) {
        this.socket.emit(Constance_1.SEND_TO_RESPONSE_AFTER_SEND_MESSAGE, message);
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=SocketService.js.map