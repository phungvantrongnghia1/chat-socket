import express, { Request, Response } from "express";
import { Server } from "http";
import { Server as ServerIO } from "socket.io";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { socketMiddleware } from "./socketMiddleware";
import { useExpressServer } from "routing-controllers";
import cors from "cors";
import { bootstrapServer, prisma } from "./bootstrapServer";
import { UserController } from "./src/User/UserController";
import "reflect-metadata";
import { ErrorFormatterMiddleware } from "./src/pskg/ExpressErrorMiddlewareInterface";
import { ChatController } from "./src/Chat/ChatController";
import { UserSocket } from "./src/socket/User";
import { SocketService } from "./src/socket/SocketService";
import { bootstrapAuth } from "./bootstrapAuth";
const app = express();
const server = new Server(app);
const io = new ServerIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["authrization"],
    credentials: true,
  },
});
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Authorization,Content-Type",
    exposedHeaders: "Authorization,RefreshToken",
  })
);
app.use(express.static("./"));
app.set("view engine", "ejs");
app.set("vews", "./views");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(bootstrapServer);
app.use(bootstrapAuth);
io.on("connection", async (socket: any) => {
  console.log("vo");
  const socketService = new SocketService(io, socket, prisma);

  const user = await socketService.updateUserSocketId();
  await socketService.emitUpdateStatusUser(user);

  // handle emit
  socketService.receiviveMessageAndEmitMessage();
});

useExpressServer(app, {
  controllers: [UserController, ChatController],
  defaultErrorHandler: false,
  middlewares: [ErrorFormatterMiddleware],
});
server.listen("3333", () => {
  console.log("Server in running at port 3333");
});
