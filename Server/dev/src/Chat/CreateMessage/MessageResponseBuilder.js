"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponseBuilder = void 0;
class MessageResponseBuilder {
    static build(message) {
        return {
            isFromSender: message.isFromSender,
            createdAt: message.createdAt,
            content: message.content,
            id: message.id.toString(),
            fromId: message.header.fromId.toString(),
            toId: message.header.toId.toString(),
        };
    }
}
exports.MessageResponseBuilder = MessageResponseBuilder;
//# sourceMappingURL=MessageResponseBuilder.js.map