// src/core/base-repository.js

/**
 * Clase BaseRepository
 * Provee métodos CRUD genéricos para cualquier modelo de datos.
 * 
 * @example
 * // Para usar este repositorio en un modelo de usuario:
 * import User from '../modules/auth/models/user.model.js';
 * import BaseRepository from '../../core/base-repository.js';
 * 
 * class UserRepository extends BaseRepository {
 *   constructor() {
 *     super(User);
 *   }
 * }
 */
export default class BaseRepository {
    /**
     * Constructor del repositorio.
     * @param {Model} model - Modelo de la base de datos (por ejemplo, un modelo de Mongoose).
     */
    constructor(model) {
      this.model = model;
    }
  
    /**
     * Crea un nuevo documento en la base de datos.
     * @param {Object} data - Datos a guardar.
     * @returns {Promise<Object>} - Documento creado.
     */
    async create(data) {
      const document = new this.model(data);
      return await document.save();
    }
  
    /**
     * Busca documentos que coincidan con el filtro.
     * @param {Object} filter - Objeto de filtro.
     * @returns {Promise<Array>} - Lista de documentos encontrados.
     */
    async find(filter = {}) {
      return await this.model.find(filter);
    }
  
    /**
     * Busca un documento por su ID.
     * @param {String} id - ID del documento.
     * @returns {Promise<Object>} - Documento encontrado.
     */
    async findById(id) {
      return await this.model.findById(id);
    }
  
    /**
     * Actualiza un documento por su ID.
     * @param {String} id - ID del documento a actualizar.
     * @param {Object} data - Datos nuevos.
     * @returns {Promise<Object>} - Documento actualizado.
     */
    async update(id, data) {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    }
  
    /**
     * Elimina un documento por su ID.
     * @param {String} id - ID del documento a eliminar.
     * @returns {Promise<Object>} - Documento eliminado.
     */
    async delete(id) {
      return await this.model.findByIdAndDelete(id);
    }
  }
  