"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const UserNotFoundError_1 = require("../UserNotFoundError");
const TokenUser_1 = require("./TokenUser");
class UserLogin {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(payload) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: payload.userName,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                socketId: true,
            },
        });
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        const token = TokenUser_1.generateAccessToken(user, "1h");
        return { token, user };
    }
}
exports.UserLogin = UserLogin;
//# sourceMappingURL=UserLogin.js.map