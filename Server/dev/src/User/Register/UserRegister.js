"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegister = void 0;
class UserRegister {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async execute(payload) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                email: payload.userName
            }
        });
        if (user) {
            return false;
        }
        const userCreate = await this.prismaClient.user.create({
            data: {
                email: payload.userName,
                name: payload.fullName,
                password: payload.password
            }
        });
        return true;
    }
}
exports.UserRegister = UserRegister;
//# sourceMappingURL=UserRegister.js.map