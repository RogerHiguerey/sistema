// src/modules/auth/controllers/auth.controller.js
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

/**
 * Registra un nuevo usuario asociado a una compañía.
 * Se espera que el middleware de multitenancy inyecte el tenantId en req.tenantId.
 * El cuerpo de la solicitud debe incluir el companyId.
 */

export const registerUser = async (req, res, next) => {
  try {
    // Combina los datos del body con el tenantId obtenido del middleware
    const userData = { ...req.body, tenantId: req.tenantId };
    const newUser = await authService.register(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
