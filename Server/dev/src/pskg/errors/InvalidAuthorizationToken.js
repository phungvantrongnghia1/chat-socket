"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAuthorizationToken = void 0;
const routing_controllers_1 = require("routing-controllers");
class InvalidAuthorizationToken extends routing_controllers_1.HttpError {
    constructor(correlationId) {
        super(403);
        this.correlationId = correlationId;
        Object.setPrototypeOf(this, InvalidAuthorizationToken.prototype);
    }
    toJSON() {
        return {
            id: this.correlationId,
            status: "ERROR",
            type: "InvalidAuthorizationToken",
            debugMessage: "The Token's Signature resulted invalid",
            options: {},
        };
    }
}
exports.InvalidAuthorizationToken = InvalidAuthorizationToken;
//# sourceMappingURL=InvalidAuthorizationToken.js.map