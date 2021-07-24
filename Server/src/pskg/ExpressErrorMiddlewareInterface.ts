import { isAppRequest } from "../../bootstrapServer";
import express, { Response } from "express";
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";


@Middleware({ type: "after" })
export class ErrorFormatterMiddleware implements ExpressErrorMiddlewareInterface {
  public async error(
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    const status = error instanceof HttpError && error.httpCode ? error.httpCode : 500;
    if(status !== 500){
        response.status(status).json(error);
        return;
    }
    const responseObject = {
        debugMessage: error.message,
        status: "ERROR",
        type: "GenericApplicationError",
      };

      response.status(status).json(responseObject);
     return ;
  }
}