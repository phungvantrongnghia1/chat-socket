"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class UserNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, "User not found!");
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=UserNotFoundError.js.map