//src/controllers/auth.js
import * as authService from '../services/auth.js';
import createHttpError from 'http-errors';
import { refreshUserSession, logout } from '../services/auth.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createHttpError(400, 'Email and password are required');
    }

    const sessionData = await authService.login(email, password);

    res
      .cookie('refreshToken', sessionData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({
        status: 'success',
        message: 'Successfully logged in an user!',
        data: {
          accessToken: sessionData.accessToken,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: 'error', message: 'No refresh token provided' });
    }

    const accessToken = await refreshUserSession(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await logout(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
