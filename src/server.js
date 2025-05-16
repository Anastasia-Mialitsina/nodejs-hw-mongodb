// // src/server.js
// import express from 'express';
// import cors from 'cors';
// import pino from 'pino';
// import { getContacts, getContactById } from './controllers/contactsController.js'; 

// const logger = pino();

// export const setupServer = () => {
//   const app = express();

//   app.use(cors());

//   app.get('/contacts', getContacts);
//   app.get('/contacts/:contactId', getContactById); 

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

// setupServer();


// src/server.js
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routers/contacts');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
