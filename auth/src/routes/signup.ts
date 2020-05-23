import { DatabaseConnectionError } from './../errors/database-connection-error';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

const validationMiddleware = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
];

router.post('/api/users/signup', [...validationMiddleware], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }


  throw new DatabaseConnectionError();
  
  const { email, password } = req.body;

  console.log('Creating a user...');

  res.send({ email, password });
  
});

export { router as signupRouter };