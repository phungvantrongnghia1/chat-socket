import { AppRequest } from "../../bootstrapServer";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Req,
} from "routing-controllers";
import { Response } from "express";
import { PayloadLogin } from "./UserLogin/UserLogin";

@Controller()
export class UserController {
  @Post("/v1/users/login")
  async post(
    @Req() req: AppRequest,
    @Res() response: Response,
    @Body() payload: PayloadLogin
  ) {
    const { token, user } = await req.interator.userLogin.execute(payload);
    response.setHeader("Authorization", token);
    return user;
  }
  @Get("/v1/users/me/friend")
  getFriend(@Req() req: AppRequest) {
    return req.interator.userGetFriend.execute(req);
  }
}
