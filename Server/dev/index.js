"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const routing_controllers_1 = require("routing-controllers");
const cors_1 = __importDefault(require("cors"));
const bootstrapServer_1 = require("./bootstrapServer");
const UserController_1 = require("./src/User/UserController");
require("reflect-metadata");
const ExpressErrorMiddlewareInterface_1 = require("./src/pskg/ExpressErrorMiddlewareInterface");
const ChatController_1 = require("./src/Chat/ChatController");
const SocketService_1 = require("./src/socket/SocketService");
const bootstrapAuth_1 = require("./bootstrapAuth");
const app = express_1.default();
const server = new http_1.Server(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["authrization"],
        credentials: true,
    },
});
app.use(cors_1.default({
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Authorization,Content-Type",
    exposedHeaders: "Authorization,RefreshToken",
}));
app.use(express_1.default.static("./"));
app.set("view engine", "ejs");
app.set("vews", "./views");
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse application/json
app.use(body_parser_1.default.json());
app.use(bootstrapServer_1.bootstrapServer);
app.use(bootstrapAuth_1.bootstrapAuth);
io.on("connection", async (socket) => {
    console.log("vo");
    const socketService = new SocketService_1.SocketService(io, socket, bootstrapServer_1.prisma);
    const user = await socketService.updateUserSocketId();
    await socketService.emitUpdateStatusUser(user);
    // handle emit
    socketService.receiviveMessageAndEmitMessage();
});
routing_controllers_1.useExpressServer(app, {
    controllers: [UserController_1.UserController, ChatController_1.ChatController],
    defaultErrorHandler: false,
    middlewares: [ExpressErrorMiddlewareInterface_1.ErrorFormatterMiddleware],
});
server.listen("3333", () => {
    console.log("Server in running at port 3333");
});
//# sourceMappingURL=index.js.map