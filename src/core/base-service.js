// src/core/base-service.js

/**
 * Clase BaseService
 * Proporciona métodos básicos para la lógica de negocio,
 * delegando las operaciones CRUD al repositorio asociado.
 *
 * @example
 * // Para un servicio de usuario:
 * import UserRepository from '../repositories/user.repository.js';
 * import BaseService from '../../core/base-service.js';
 *
 * class UserService extends BaseService {
 *   constructor() {
 *     super(new UserRepository());
 *   }
 *
 *   // Se pueden agregar métodos específicos para el usuario
 * }
 */
export default class BaseService {
    /**
     * Constructor del servicio.
     * @param {BaseRepository} repository - Instancia del repositorio asociado.
     */
    constructor(repository) {
      this.repository = repository;
    }
  
    /**
     * Crea un nuevo recurso.
     * @param {Object} data - Datos del recurso.
     * @returns {Promise<Object>} - Recurso creado.
     */
    async create(data) {
      return await this.repository.create(data);
    }
  
    /**
     * Obtiene todos los recursos que cumplen el filtro.
     * @param {Object} filter - Objeto de filtro.
     * @returns {Promise<Array>} - Lista de recursos.
     */
    async getAll(filter = {}) {
      return await this.repository.find(filter);
    }
  
    /**
     * Obtiene un recurso por su ID.
     * @param {String} id - ID del recurso.
     * @returns {Promise<Object>} - Recurso encontrado.
     */
    async getById(id) {
      return await this.repository.findById(id);
    }
  
    /**
     * Actualiza un recurso por su ID.
     * @param {String} id - ID del recurso.
     * @param {Object} data - Datos a actualizar.
     * @returns {Promise<Object>} - Recurso actualizado.
     */
    async update(id, data) {
      return await this.repository.update(id, data);
    }
  
    /**
     * Elimina un recurso por su ID.
     * @param {String} id - ID del recurso.
     * @returns {Promise<Object>} - Recurso eliminado.
     */
    async delete(id) {
      return await this.repository.delete(id);
    }
  }
  