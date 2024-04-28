import express from 'express';
import validate from '../middlewares/validators'
import { Register, login } from '../controllers/UserController';
import { emailAddress, loginPassword, username } from '../validators/authValidator';

const _router: express.Router = express.Router({
  mergeParams: true,
})

//USER LOGIN
_router
  .route('/login')
  .post(validate([emailAddress(), loginPassword()]), login);

//USER REGISTER
_router
  .route('/register')
  .post(validate([emailAddress(), loginPassword(), username()]), Register);

export const router = _router;