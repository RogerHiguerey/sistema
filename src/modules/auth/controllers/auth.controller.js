// src/modules/auth/controllers/auth.controller.js
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

export const register = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
