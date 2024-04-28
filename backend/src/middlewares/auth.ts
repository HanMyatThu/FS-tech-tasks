import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { validateToken, extractToken } from '../utils';
import HttpError from '../utils/httpError';

interface AuthorizedRequestInterface extends Request {
  userId : string
}

const auth = async function (req: AuthorizedRequestInterface, res: Response, next: NextFunction) {
  try {
    const token: string = extractToken(req.headers.authorization);
    const payload: jwt.JwtPayload = await validateToken(res,token);
    if (!payload['id']) {
      return HttpError(
        res,
        401,
        {
          title: 'unauthorized',
          detail: 'Invalid Authorization header',
          code: 401,
        }
      );
    }
    req.userId = payload.id;
    next();
  } catch (e) {
    return HttpError(
      res,
      401,
      {
        title: 'unauthorized',
        detail: 'Invalid Authorization header',
        code: 401,
      }
    );
  }
};

export default auth;