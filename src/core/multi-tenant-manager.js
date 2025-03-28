// src/core/multi-tenant-manager.js

/**
 * Clase MultiTenantManager
 * Maneja la extracción y asignación del tenantId en las solicitudes.
 */

export default class MultiTenantManager {
    /**
     * Extrae el tenantId de la solicitud.
     * Puede obtenerlo de un header, subdominio o token JWT.
     * @param {Object} req - Objeto de la solicitud de Express.
     * @returns {String|null} - El tenantId o null si no se encuentra.
     */

    static getTenantId(req) {
      // Ejemplo: obtener el tenantId desde un header llamado 'x-tenant-id'
      const tenantId = req.headers['x-tenant-id'];
      return tenantId || null;
    }
  
    /**
     * Middleware para inyectar el tenantId en la solicitud.
     * Agrega la propiedad tenantId a req para que esté disponible en controladores y servicios.
     * @param {Object} req - Objeto de la solicitud de Express.
     * @param {Object} res - Objeto de la respuesta de Express.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */

    static tenantMiddleware(req, res, next) {
      req.tenantId = MultiTenantManager.getTenantId(req);
      // Opcional: Agregar validaciones para asegurarse de que tenantId no sea null.
      next();
    }
  }
  