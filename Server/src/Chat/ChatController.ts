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

@Controller()
export class ChatController {
  @Post("/v1/users/friend/message")
  post(@Req() req: AppRequest, @Body() payload: any) {
    return req.interator.createMessage.execute(payload);
  }
  @Get("/v1/users/friend/message/:friendId")
  getMessage(@Req() req: AppRequest, @Param("friendId") friendId: string) {
    return req.interator.messageGet.execute(req, friendId);
  }
}
