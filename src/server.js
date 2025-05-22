// const express = require('express');
// const logger = require('morgan');
// const cors = require('cors');
// const contactsRouter = require('./routers/contacts');
// const errorHandler = require('./middlewares/errorHandler');
// const notFoundHandler = require('./middlewares/notFoundHandler');

// const app = express();

// app.use(logger('dev'));
// app.use(cors());
// app.use(express.json());

// app.use('/api/contacts', contactsRouter);

// app.use(notFoundHandler);
// app.use(errorHandler);

// module.exports = app;


//src/server.js
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);


export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
