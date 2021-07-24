import { PrismaClient } from ".prisma/client";
import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { CreateMessage } from "./src/Chat/CreateMessage/CreateMessage";
import { MessageGet } from "./src/Chat/MessageGet/MessageGet";
import { UserGetFriend } from "./src/User/UserGetFriend/UserGetFriend";
import { UserToken } from "./src/User/UserLogin/TokenUser";
import { UserLogin } from "./src/User/UserLogin/UserLogin";
export type InteractorContext = {
  user: UserToken | undefined;
};

export type Interactor = {
  userLogin: UserLogin;
  userGetFriend: UserGetFriend;
  createMessage: CreateMessage;
  messageGet: MessageGet;
};
export type AppRequest = Request & {
  interator: Interactor;
  user: UserToken;
};
export function isAppRequest(req: Request | AppRequest): req is AppRequest {
  return (req as AppRequest) !== undefined;
}
export const prisma = new PrismaClient({
  datasources: { db: { url: process.env.pgBouncerUrl || "" } },
});
const userLogin = new UserLogin(prisma);
const userGetFriend = new UserGetFriend(prisma);
const createMessage = new CreateMessage(prisma);
const messageGet = new MessageGet(prisma);
export function bootstrapServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
