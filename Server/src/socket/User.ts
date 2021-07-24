import { PrismaClient, User } from "@prisma/client";
import { CreateMessageAction } from "../Chat/CreateMessage/CreateMessageAction";
import { ReturnOfPromise } from "../pskg/ReturnOfPromise";
import { MessageResponse, PayloadCreateMessage } from "./UserSocketDto";
export type UserResponse = Omit<User, "password">;
export class UserSocket {
  constructor(private prismaClient: PrismaClient) {}
  async updateSocketId(
    userId: string,
    socketId: string
  ): Promise<UserResponse> {
    const user = this.prismaClient.user.update({
      where: {
        id: Number.parseInt(userId, 10),
      },
      data: {
        socketId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        socketId: true,
      },
    });
    return user;
  }
  async getFriendOfUserId(userId: number): Promise<string[]> {
    const friends = await this.prismaClient.friend.findMany({
      where: {
        userId,
      },
      select: {
        friend: {
          select: {
            socketId: true,
          },
        },
      },
    });
    const friendIds = friends
      .filter((friend) => friend.friend?.socketId)
      .map((friend) => friend.friend.socketId || "");
    return friendIds;
  }
  async createMessage(payload: PayloadCreateMessage) {
    return await new CreateMessageAction(this.prismaClient).execute(payload);
  }
}
