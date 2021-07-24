"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageAction = void 0;
const MessageResponseBuilder_1 = require("./MessageResponseBuilder");
class CreateMessageAction {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async execute(payload) {
        const header = await this.prismaClient.header.create({
            data: {
                fromId: Number.parseInt(payload.userId, 10),
                toId: Number.parseInt(payload.friendId, 10),
            },
        });
        const messge = await this.prismaClient.message.create({
            data: {
                content: payload.message,
                headerId: header.id,
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
        return MessageResponseBuilder_1.MessageResponseBuilder.build(messge);
    }
}
exports.CreateMessageAction = CreateMessageAction;
//# sourceMappingURL=CreateMessageAction.js.map