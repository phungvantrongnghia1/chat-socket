"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocket = void 0;
const CreateMessageAction_1 = require("../Chat/CreateMessage/CreateMessageAction");
class UserSocket {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async updateSocketId(userId, socketId) {
        const user = this.prismaClient.user.update({
            where: {
                id: Number.parseInt(userId, 10),
            },
            data: {
                socketId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                socketId: true,
            },
        });
        return user;
    }
    async getFriendOfUserId(userId) {
        const friends = await this.prismaClient.friend.findMany({
            where: {
                userId,
            },
            select: {
                friend: {
                    select: {
                        socketId: true,
                    },
                },
            },
        });
        const friendIds = friends
            .filter((friend) => { var _a; return (_a = friend.friend) === null || _a === void 0 ? void 0 : _a.socketId; })
            .map((friend) => friend.friend.socketId || "");
        return friendIds;
    }
    async createMessage(payload) {
        return await new CreateMessageAction_1.CreateMessageAction(this.prismaClient).execute(payload);
    }
}
exports.UserSocket = UserSocket;
//# sourceMappingURL=User.js.map