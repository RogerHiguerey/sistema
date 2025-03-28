// src/modules/companies/repositories/company.repository.js
import BaseRepository from '../../../core/base-repository.js';
import Company from '../models/company.model.js';

/**
 * Repositorio para Company que extiende la funcionalidad básica.
 */

export default class CompanyRepository extends BaseRepository {
  constructor() {
    super(Company);
  }
  
  // Puedes añadir métodos específicos para la búsqueda o actualización de empresas
}
