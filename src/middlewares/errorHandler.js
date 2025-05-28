// src/middlewares/errorHandler.js
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;

  res.status(status).json({
    status,
    message,
    data: null, 
  });
};

export default errorHandler;


