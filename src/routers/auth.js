//src/routers/auth.js
import express from 'express';
import {
  register,
  login,
  refreshSession,
  logoutController,
} from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/users.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/refresh', refreshSession);

router.post('/logout', logoutController);

export default router;
