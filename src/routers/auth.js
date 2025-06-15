// //src/routers/auth.js
// import express from 'express';
// import {
//   register,
//   login,
//   refreshSession,
//   logoutController,
// } from '../controllers/auth.js';
// import validateBody from '../middlewares/validateBody.js';
// import { registerSchema } from '../schemas/users.js';

// const router = express.Router();

// router.post('/register', validateBody(registerSchema), register);
// router.post('/login', login);
// router.post('/refresh', refreshSession);
// router.post('/logout', logoutController); 

// export default router;


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

// Регистрация нового пользователя
router.post('/register', validateBody(registerSchema), register);

// Логин пользователя
router.post('/login', validateBody(loginSchema), login);

// Обновление access-токена по refresh-токену
router.post('/refresh', refreshSession);

// Логаут: удаление сессии
router.post('/logout', logoutController);

export default router;
