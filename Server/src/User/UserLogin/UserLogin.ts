import { PrismaClient, User } from "@prisma/client";
import { UserNotFoundError } from "../UserNotFoundError";
import { generateAccessToken, UserToken } from "./TokenUser";
export type PayloadLogin = {
  userName: string;
  passWord: string;
};
export type UserLoginResponse = {
  token: string;
  user: UserToken;
};
export class UserLogin {
  constructor(private readonly prisma: PrismaClient) {}
  async execute(payload: PayloadLogin): Promise<UserLoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.userName,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        socketId: true,
      },
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    const token = generateAccessToken(user, "1h");
    return { token, user };
  }
}
