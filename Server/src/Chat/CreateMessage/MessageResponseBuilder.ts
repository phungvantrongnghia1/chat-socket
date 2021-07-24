import { MessageResponse } from "../../socket/UserSocketDto";

export class MessageResponseBuilder {
  static build(message: any): MessageResponse {
    return {
      isFromSender: message.isFromSender,
      createdAt: message.createdAt,
      content: message.content,
      id: message.id.toString(),
      fromId: message.header.fromId.toString(),
      toId: message.header.toId.toString(),
    };
  }
}
