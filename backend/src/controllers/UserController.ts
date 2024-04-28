import { User } from "../models/User";
import { Request, Response } from 'express'
import { matchedData } from "express-validator";
import { generateJWT } from "../utils";
import { jsonOne } from '../utils/general';
import HttpError from '../utils/httpError';
import mongoose from "mongoose";

type Itoken = [
  {
    token: string
  }
]

const tokenBuilder = async (userid: mongoose.Types.ObjectId) => {
  const accessToken = generateJWT({ id: userid });
  return {
      accessToken: accessToken,
  };
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    let bodyData = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    const { email, password } = bodyData;

    const user = await User.findOne({ email, password });

    if (!user) {
      return HttpError(
        res,
        400,
        {
          title: 'bad_request',
          detail: 'Invalid Credentials',
          code: 400,
        }
     );
    }
     
    const token = await tokenBuilder(user._id);
    user.tokens.push({ token : token })
    const response = {
      user : {
        _id: user._id,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl
      },
      accessToken: token.accessToken,
    };
    return jsonOne<any>(res, 200, response);
  } catch (error) {
    return res.status(500).send({
      error: {
          title: 'general_error',
          detail: 'An error occurred, Please retry again later',
          code: 500,
      },
    });
  }
};

export const Register = async (
  req: Request,
  res: Response,
) => {
  try {
    let bodyData = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    const { username, email, password } = bodyData;

    const isExistedUser = await User.findOne({ email })
    if (isExistedUser) {
      return HttpError(
        res,
        400,
        {
        title: 'bad_request',
        detail: 'User with email is already existed',
        code: 400,
      });
    }

    const user = new User({
      email, 
      username,
      password,
    })
    await user.save()
    const response = {
      _id: user._id,
      email: user.email,
      username: user.username,
      tokens: user.tokens
    }
    return jsonOne<any>(res, 200, response);
  } catch (error) {
    return res.status(500).send({
      error: {
          title: 'general_error',
          detail: 'An error occurred, Please retry again later',
          code: 500,
      },
    });
  }
}