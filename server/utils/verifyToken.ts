import jwt, { VerifyErrors, Secret, VerifyOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error";

interface User {
  userID: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  const options: VerifyOptions = {
    complete: false,
  };

  jwt.verify(
    token,
    process.env.JWT as Secret,
    options,
    (err, decoded) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = decoded as User;
      next();
    }
  );
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, (err) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
