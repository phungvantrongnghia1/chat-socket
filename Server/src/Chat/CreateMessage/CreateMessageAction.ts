import { PrismaClient } from "@prisma/client";
import {
  MessageResponse,
  PayloadCreateMessage,
} from "../../socket/UserSocketDto";
import { MessageResponseBuilder } from "./MessageResponseBuilder";

export class CreateMessageAction {
  constructor(private readonly prismaClient: PrismaClient) {}
  async execute(payload: PayloadCreateMessage): Promise<MessageResponse> {
    const header = await this.prismaClient.header.create({
      data: {
        fromId: Number.parseInt(payload.userId, 10),
        toId: Number.parseInt(payload.friendId, 10),
      },
    });
    const messge = await this.prismaClient.message.create({
      data: {
        content: payload.message,
        headerId: header.id,
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        isFromSender: true,
        header: {
          select: {
            id: true,
            fromId: true,
            toId: true,
          },
        },
      },
    });
    return MessageResponseBuilder.build(messge);
  }
}
