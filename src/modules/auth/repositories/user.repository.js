// src/modules/auth/repositories/user.repository.js
import BaseRepository from '../../../core/base-repository.js';
import User from '../models/user.model.js';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  // Puedes agregar métodos específicos, por ejemplo, para buscar por email:
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
}
