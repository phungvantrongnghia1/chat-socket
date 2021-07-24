"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessage = void 0;
const CreateMessageAction_1 = require("./CreateMessageAction");
class CreateMessage {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(payload) {
        return await new CreateMessageAction_1.CreateMessageAction(this.prisma).execute(payload);
    }
}
exports.CreateMessage = CreateMessage;
//# sourceMappingURL=CreateMessage.js.map