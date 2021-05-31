import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    req.currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
  } catch {
    //
  }

  next();
};
