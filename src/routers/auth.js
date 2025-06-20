//src/routers/auth.js
import express from 'express';
import {
  register,
  login,
  refreshSession,
  logoutController,
  sendResetEmailController,
} from '../controllers/auth.js';

import validateBody from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
} from '../schemas/users.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', refreshSession);
router.post('/logout', logoutController);
router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  sendResetEmailController
);

export default router;
