"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetFriend = void 0;
class UserGetFriend {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(content) {
        var _a;
        const friendQueryResponse = await this.prisma.friend.findMany({
            where: {
                userId: ((_a = content.user) === null || _a === void 0 ? void 0 : _a.id) || 0,
            },
            select: {
                friend: {
                    select: {
                        id: true,
                        email: true,
                        socketId: true,
                        name: true,
                        createdAt: true,
                    },
                },
            },
        });
        const response = this.buildResponse(friendQueryResponse);
        return response;
    }
    buildResponse(friendQueryResponse) {
        const response = friendQueryResponse.map((item) => item.friend);
        return response;
    }
}
exports.UserGetFriend = UserGetFriend;
//# sourceMappingURL=UserGetFriend.js.map