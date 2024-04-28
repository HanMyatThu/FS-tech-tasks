import { body, header } from 'express-validator';
import { extractToken } from '../utils';

const authorization = () => {
  return header('authorization')
    .trim()
    .escape()
    .exists()
    .bail()
    .notEmpty()
    .withMessage('Missing authentication header')
    .bail()
    .customSanitizer((token, { location }) => {
        if (location === 'headers') {
            return extractToken(token);
        }
    })
    .isJWT()
    .withMessage(
        'Invalid Authorization header, must be Bearer authorization'
    );
};

const username = () => {
  return body('username')
    .trim()
    .escape()
    .exists()
    .bail()
    .notEmpty()
    .withMessage('Username is required')
}

const emailAddress = () => {
  return body('email')
    .trim()
    .escape()
    .exists()
    .bail()
    .notEmpty()
    .withMessage('Email address is required')
    .bail()
    .isLength({
        min: 3,
        max: 100,
    })
    .withMessage('Email address must be between 3 and 100 characters')
    .bail()
    .isEmail()
    .withMessage('Email address is not valid')
    .customSanitizer((email) => {
        return email.toLowerCase();
    });
};

const loginPassword = () => {
  return body('password')
    .exists()
    .bail()
    .trim()
    .bail()
    .escape()
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .isLength({
        max: 255,
        min: 6,
    })
    .withMessage('Password is not valid');
};

export {
  authorization,
  username,
  emailAddress,
  loginPassword,
};