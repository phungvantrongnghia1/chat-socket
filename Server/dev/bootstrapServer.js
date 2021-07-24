"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapServer = exports.prisma = exports.isAppRequest = void 0;
const client_1 = require(".prisma/client");
const CreateMessage_1 = require("./src/Chat/CreateMessage/CreateMessage");
const MessageGet_1 = require("./src/Chat/MessageGet/MessageGet");
const UserGetFriend_1 = require("./src/User/UserGetFriend/UserGetFriend");
const UserLogin_1 = require("./src/User/UserLogin/UserLogin");
function isAppRequest(req) {
    return req !== undefined;
}
exports.isAppRequest = isAppRequest;
exports.prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.pgBouncerUrl || "" } },
});
const userLogin = new UserLogin_1.UserLogin(exports.prisma);
const userGetFriend = new UserGetFriend_1.UserGetFriend(exports.prisma);
const createMessage = new CreateMessage_1.CreateMessage(exports.prisma);
const messageGet = new MessageGet_1.MessageGet(exports.prisma);
function bootstrapServer(req, res, next) {
    if (!isAppRequest(req)) {
        return next();
    }
    req.interator = {
        userLogin,
        userGetFriend,
        createMessage,
        messageGet,
    };
    next();
}
exports.bootstrapServer = bootstrapServer;
//# sourceMappingURL=bootstrapServer.js.map