// //src/services/auth.js
// import bcrypt from 'bcryptjs';
// import createHttpError from 'http-errors';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';
// import Session from '../models/session.js';

// const ACCESS_TOKEN_EXPIRATION = '15m'; 
// const REFRESH_TOKEN_EXPIRATION = '30d'; 

// export const register = async ({ name, email, password }) => {
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     throw createHttpError(409, 'Email in use');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   return user;
// };

// export const login = async (email, password) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw createHttpError(401, 'Invalid email or password');
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password);

//   if (!passwordMatch) {
//     throw createHttpError(401, 'Invalid email or password');
//   }

//   await Session.deleteMany({ userId: user._id });

//   const accessToken = jwt.sign(
//     { userId: user._id, email: user.email },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: ACCESS_TOKEN_EXPIRATION }
//   );

//   const refreshToken = jwt.sign(
//     { userId: user._id, email: user.email },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: REFRESH_TOKEN_EXPIRATION }
//   );

//   const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); 
//   const refreshTokenValidUntil = new Date(
//     Date.now() + 30 * 24 * 60 * 60 * 1000
//   ); 

//   await Session.create({
//     userId: user._id,
//     accessToken,
//     refreshToken,
//     accessTokenValidUntil,
//     refreshTokenValidUntil,
//   });

//   return { accessToken, refreshToken };
// };

// export const refreshUserSession = async (refreshToken) => {
//   try {

//     const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//     const existingSession = await Session.findOne({ refreshToken });

//     if (!existingSession) {
//       throw createHttpError(401, 'Session not found');
//     }

//     await Session.deleteOne({ _id: existingSession._id });

//     const user = await User.findById(payload.userId);
//     if (!user) {
//       throw createHttpError(401, 'User not found');
//     }

//     const newAccessToken = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: ACCESS_TOKEN_EXPIRATION }
//     );

//     const newRefreshToken = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: REFRESH_TOKEN_EXPIRATION }
//     );

//     const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
//     const refreshTokenValidUntil = new Date(
//       Date.now() + 30 * 24 * 60 * 60 * 1000
//     );

//     await Session.create({
//       userId: user._id,
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//       accessTokenValidUntil,
//       refreshTokenValidUntil,
//     });

//     return newAccessToken;
//   } catch (err) {
//     if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
//       throw createHttpError(401, 'Invalid refresh token');
//     }
//     throw err;
//   }
// };

// export const logout = async (refreshToken) => {
//   if (!refreshToken) {
//     throw createHttpError(401, 'Refresh token is required');
//   }

//   const deletedSession = await Session.findOneAndDelete({ refreshToken });

//   if (!deletedSession) {
//     throw createHttpError(401, 'Session not found');
//   }
// };


import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Session from '../models/session.js';

const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '30d';

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw createHttpError(401, 'Invalid email or password');
  }
  // Удаляем старые сессии
  await Session.deleteMany({ userId: user._id });
  // Генерируем токены
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );
  // Сохраняем новую сессию
  const now = Date.now();
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now + 30 * 24 * 60 * 60 * 1000),
  });
  return { accessToken, refreshToken };
};

export const refreshUserSession = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const existing = await Session.findOne({ refreshToken });
    if (!existing) {
      throw createHttpError(401, 'Session not found');
    }
    // Удаляем старую сессию
    await Session.deleteOne({ _id: existing._id });
    const user = await User.findById(payload.userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }
    // Генерация новых токенов
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
    const newRefreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );
    // Сохраняем новую сессию
    const now = Date.now();
    await Session.create({
      userId: user._id,
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil: new Date(now + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(now + 30 * 24 * 60 * 60 * 1000),
    });
    return accessToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Invalid refresh token');
    }
    throw err;
  }
};

export const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token is required');
  }
  const deleted = await Session.findOneAndDelete({ refreshToken });
  if (!deleted) {
    throw createHttpError(401, 'Session not found');
  }
};
