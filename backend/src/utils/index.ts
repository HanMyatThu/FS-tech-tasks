import * as jwt from 'jsonwebtoken';
import HttpError from './httpError';
import 'dotenv/config';

const generateJWT = function (
  payload: object = {},
  options: object = {}
): string {
  const privateKey: any = process.env.JWT_SECRET;
  const defaultOptions: object = {
    expiresIn: '1h',
  };

  return jwt.sign(
    payload,
    privateKey,
    Object.assign(defaultOptions, options)
  );
};

const validateToken = async function (res: any, token: string): Promise<Object> {
  try {
    const publicKey: any = process.env.JWT_SECRET;
    const payload : jwt.JwtPayload  | string = await jwt.verify(token, publicKey); 
    return payload;
  } catch (e) {
    throw new Error('Invalid Token')
  }
};

const extractToken = function (token: string): string | null {
  if (token?.startsWith('Bearer ')) {
    return token.slice(7, token.length);
  }
  return null;
};

export {
  generateJWT,
  validateToken,
  extractToken,
};