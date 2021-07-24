import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
export type UserToken = Omit<User, "password">;

export const generateAccessToken = (
  user: UserToken,
  expiresIn: string
): string => {
  const token = jwt.sign(user, process.env.SESCRET_KEY || "sescret", {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};
