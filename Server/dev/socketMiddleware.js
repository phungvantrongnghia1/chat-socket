"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketMiddleware = void 0;
function socketMiddleware(io) {
    io.on("connection", (socket) => {
        console.log('Có người kết nối : ', socket.id);
    });
}
exports.socketMiddleware = socketMiddleware;
//# sourceMappingURL=socketMiddleware.js.map