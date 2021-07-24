import { PrismaClient, User } from "@prisma/client";
import { InteractorContext } from "../../../bootstrapServer";
import { UserNotFoundError } from "../UserNotFoundError";
type UserResponse = Omit<User, "password">;
type FriendQueryResponse = {
  friend: UserResponse;
};

export class UserGetFriend {
  constructor(private readonly prisma: PrismaClient) {}
  async execute(content: InteractorContext) {
    const friendQueryResponse = await this.prisma.friend.findMany({
      where: {
        userId: content.user?.id || 0,
      },
      select: {
        friend: {
          select: {
            id: true,
            email: true,
            socketId: true,
            name: true,
            createdAt: true,
          },
        },
      },
    });
    const response = this.buildResponse(friendQueryResponse);

    return response;
  }
  private buildResponse(
    friendQueryResponse: FriendQueryResponse[]
  ): UserResponse[] {
    const response = friendQueryResponse.map((item) => item.friend);
    return response;
  }
}
