// src/modules/auth/services/auth.service.js
import BaseService from '../../../core/base-service.js';
import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../../../config/settings.js';

export default class AuthService extends BaseService {
  constructor() {
    super(new UserRepository());
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   */
  async register(userData) {
    // Encriptar la contraseña
    userData.password = await bcrypt.hash(userData.password, 10);
    return await this.repository.create(userData);
  }

  /**
   * Realiza el inicio de sesión
   * @param {String} email 
   * @param {String} password 
   */
  
  async login(email, password) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }
    // Generar token JWT
    const token = jwt.sign({ id: user._id, tenantId: user.tenantId, role: user.role }, env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }
}
