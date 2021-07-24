import { PrismaClient } from "@prisma/client";
import { InteractorContext } from "../../../bootstrapServer";
import { MessageResponse } from "../../socket/UserSocketDto";
import { MessageResponseBuilder } from "../CreateMessage/MessageResponseBuilder";
export type Payload = {
  currentId: string;
  friendId: string;
  isFirstFetch: boolean;
  page: number;
};
// TODO create class dto and validate

export class MessageGet {
  private numberOfMessage = 20;
  constructor(private readonly prisma: PrismaClient) {}
  async execute(
    { user }: InteractorContext,
    friendId: string
  ): Promise<MessageResponse[]> {
    const messages = await this.prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // skip: payload.isFirstFetch
      //   ? 0
      //   : (payload.page - 1) * this.numberOfMessage,
      take: this.numberOfMessage,
      where: {
        header: {
          OR: [
            {
              fromId: user?.id,
              toId: parseInt(friendId, 10),
            },
            {
              fromId: parseInt(friendId, 10),
              toId: user?.id,
            },
          ],
        },
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
    const messageResponse = messages.map((message) =>
      MessageResponseBuilder.build(message)
    );
    return messageResponse;
  }
}
