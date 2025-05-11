//src/server.js
// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import pino from 'pino';

// const logger = pino();

// export const setupServer = () => {
//   const app = express();

//   app.use(cors());

//   app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.url}`);
//     next();
//   });

//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

 
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };


// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getContacts, getContactById } from './controllers/contactsController.js'; // добавили второй контроллер

const logger = pino();

export const setupServer = () => {
  const app = express();

  app.use(cors());

  // Маршруты
  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContactById); // 👈 новый маршрут

  // Логирование
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Обработка 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
