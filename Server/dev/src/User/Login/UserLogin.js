"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const UserNotFound_1 = require("./UserNotFound");
class UserLogin {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async execute(payload) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                email: payload.userName
            }
        });
        if (!user)
            throw new UserNotFound_1.UserNotFoundError();
        if (user.password !== payload.password)
            return false;
        return true;
    }
}
exports.UserLogin = UserLogin;
//# sourceMappingURL=UserLogin.js.map