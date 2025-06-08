//src/server.js
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.path}`);
  next();
});


app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);



export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default app;
