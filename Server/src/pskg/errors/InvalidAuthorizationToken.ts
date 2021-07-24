import { HttpError } from "routing-controllers";

export class InvalidAuthorizationToken extends HttpError {
  constructor(private correlationId: string) {
    super(403);
    Object.setPrototypeOf(this, InvalidAuthorizationToken.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      id: this.correlationId,
      status: "ERROR",
      type: "InvalidAuthorizationToken",
      debugMessage: "The Token's Signature resulted invalid",
      options: {},
    };
  }
}
