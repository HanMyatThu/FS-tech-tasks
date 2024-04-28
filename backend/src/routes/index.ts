import { NextFunction, Request, Response, Router } from 'express';
import { router as AuthRouter } from './auth';
import { router as TodoRouter } from './todo';
import HttpError from 'utils/httpError';

const router: Router = Router({
  mergeParams: true,
});

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Api-Version', 'v1');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

router.use('/v1/auth', AuthRouter);
router.use('/v1', TodoRouter);

export {
  router
}