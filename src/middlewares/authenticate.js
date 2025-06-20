// // src/middlewares/authenticate.js
// import jwt from 'jsonwebtoken';
// import createHttpError from 'http-errors';

// const authenticate = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw createHttpError(401, 'No access token provided');
//     }

//     const token = authHeader.split(' ')[1];

//     let payload;
//     try {
//       payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (err) {
//       if (err.name === 'TokenExpiredError') {
//         throw createHttpError(401, 'Access token expired');
//       }
//       throw createHttpError(401, 'Invalid access token');
//     }

   
//     req.user = {
//       userId: payload.userId,
//       email: payload.email,
//     };

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// export default authenticate;

import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'No access token provided');
    }

    const token = authHeader.split(' ')[1];

    let payload;
    try {
      payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw createHttpError(401, 'Access token expired');
      }
      throw createHttpError(401, 'Invalid access token');
    }

    req.user = {
      _id: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;

