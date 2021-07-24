"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGet = void 0;
const MessageResponseBuilder_1 = require("../CreateMessage/MessageResponseBuilder");
// TODO create class dto and validate
class MessageGet {
    constructor(prisma) {
        this.prisma = prisma;
        this.numberOfMessage = 20;
    }
    async execute({ user }, friendId) {
        const messages = await this.prisma.message.findMany({
            orderBy: {
                createdAt: "desc",
            },
            // skip: payload.isFirstFetch
            //   ? 0
            //   : (payload.page - 1) * this.numberOfMessage,
            take: this.numberOfMessage,
            where: {
                header: {
                    OR: [
                        {
                            fromId: user === null || user === void 0 ? void 0 : user.id,
                            toId: parseInt(friendId, 10),
                        },
                        {
                            fromId: parseInt(friendId, 10),
                            toId: user === null || user === void 0 ? void 0 : user.id,
                        },
                    ],
                },
            },
            select: {
                content: true,
                createdAt: true,
                id: true,
                isFromSender: true,
                header: {
                    select: {
                        id: true,
                        fromId: true,
                        toId: true,
                    },
                },
            },
        });
        const messageResponse = messages.map((message) => MessageResponseBuilder_1.MessageResponseBuilder.build(message));
        return messageResponse;
    }
}
exports.MessageGet = MessageGet;
//# sourceMappingURL=MessageGet.js.map