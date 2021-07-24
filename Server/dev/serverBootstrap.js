"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverBootstrap = exports.isAppRequest = void 0;
const client_1 = require("@prisma/client");
const UserLogin_1 = require("./src/User/UserLogin");
function isAppRequest(request) {
    return request !== undefined;
}
exports.isAppRequest = isAppRequest;
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.pgBouncerUrl || '' } },
});
const userLogin = new UserLogin_1.UserLogin(prisma);
const interactors = {
    userLogin,
};
function serverBootstrap(req, res, next) {
    if (!isAppRequest(req)) {
        next();
        return;
    }
    req.interactors = interactors;
    next();
}
exports.serverBootstrap = serverBootstrap;
//# sourceMappingURL=serverBootstrap.js.map