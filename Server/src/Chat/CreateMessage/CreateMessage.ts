import { PrismaClient } from "@prisma/client";
import { PayloadCreateMessage } from "../../socket/UserSocketDto";
import { CreateMessageAction } from "./CreateMessageAction";

export class CreateMessage {
  constructor(private readonly prisma: PrismaClient) {}
  async execute(payload: PayloadCreateMessage) {
    return await new CreateMessageAction(this.prisma).execute(payload);
  }
}
