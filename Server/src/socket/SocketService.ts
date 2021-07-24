import { MessageResponse } from './UserSocketDto';
import { PrismaClient } from "@prisma/client";
import { RECEIVE_MESSAGE, SEND_MESSAGE, SEND_TO_RESPONSE_AFTER_SEND_MESSAGE } from "../pskg/Constance";
import { UserResponse, UserSocket } from "./User";
export type PayloadMessage = {
  userId: string;
  friendId: string;
  socketFriendId: string;
  message: string;
};
export class SocketService {
  private userSocket;

  constructor(
    private readonly io: any,
    private readonly socket: any,
    private readonly prisma: PrismaClient
  ) {
    this.userSocket = new UserSocket(this.prisma);
  }

  async updateUserSocketId() {
    return await this.userSocket.updateSocketId(
      this.socket.handshake.headers["authrization"],
      this.socket.id
    );
  }

  async emitUpdateStatusUser(user: UserResponse) {
    const friendIds = await this.userSocket.getFriendOfUserId(user.id);
    friendIds.map((friendId) => {
      this.io.to(friendId).emit("updateStatusAfterLogin", user);
    });
    this.socket.emit("updateOwnerStatusLogin", user);
  }

  // receive emit messge client
  receiviveMessageAndEmitMessage() {
    this.socket.on(SEND_MESSAGE, async (payload: PayloadMessage) => {
      const message = await this.userSocket.createMessage(payload);
      this.sendToMessageAfterSendMessage(message)
      this.io.to(payload.socketFriendId).emit(RECEIVE_MESSAGE, message);
    });
  }
  private sendToMessageAfterSendMessage(message: MessageResponse){
    this.socket.emit(SEND_TO_RESPONSE_AFTER_SEND_MESSAGE, message)
  }
}
