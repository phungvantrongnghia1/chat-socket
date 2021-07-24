import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { InvalidAuthorizationToken } from "./src/pskg/errors/InvalidAuthorizationToken";
import passportJWT from "passport-jwt";

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

export function bootstrapAuth(req: Request, res: Response, next: NextFunction) {
  const jwtStrategy = new JWTStrategy(
    {
      secretOrKey: process.env.SESCRET_KEY || "sescret",
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    },
    (payload, done) => {
      return done(null, payload);
    }
  );
  passport.use(jwtStrategy);

  passport.initialize();

  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (req.path.startsWith("/v1/users/login")) {
      return next();
    }
    if (user) {
      req.user = user;
    }
    if (
      error ||
      (info &&
        (info.message === "invalid signature" ||
          info.message === "No auth token"))
    ) {
      return res.status(403).json(new InvalidAuthorizationToken(""));
    }
    next();
  })(req, res, next);
}
