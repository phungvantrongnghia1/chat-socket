"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const InvalidAuthorizationToken_1 = require("./src/pskg/errors/InvalidAuthorizationToken");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const { Strategy: JWTStrategy, ExtractJwt } = passport_jwt_1.default;
function bootstrapAuth(req, res, next) {
    const jwtStrategy = new JWTStrategy({
        secretOrKey: process.env.SESCRET_KEY || "sescret",
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    }, (payload, done) => {
        return done(null, payload);
    });
    passport_1.default.use(jwtStrategy);
    passport_1.default.initialize();
    passport_1.default.authenticate("jwt", { session: false }, (error, user, info) => {
        if (req.path.startsWith("/v1/users/login")) {
            return next();
        }
        if (user) {
            req.user = user;
        }
        if (error ||
            (info &&
                (info.message === "invalid signature" ||
                    info.message === "No auth token"))) {
            return res.status(403).json(new InvalidAuthorizationToken_1.InvalidAuthorizationToken(""));
        }
        next();
    })(req, res, next);
}
exports.bootstrapAuth = bootstrapAuth;
//# sourceMappingURL=bootstrapAuth.js.map