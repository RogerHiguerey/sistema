// src/config/database/database.factory.js

import mysqlConfig          from './mysql.config.js';
import postgresqlConfig     from './postgresql.config.js';
import mongodbConfig        from './mongodb.config.js';
import { envConfig as env } from '../environments/development.js';

/**
 * Crea y retorna la conexión a la base de datos según el tipo configurado.
 * @returns {Promise<Object>} Instancia de la conexión o cliente de base de datos.
 * @throws Error si el tipo de base de datos no es soportado.
 */

export const createDatabaseConnection = async () => {
  const dbType = env.DB_TYPE || 'mongodb'; // Valor por defecto a MongoDB

  switch (dbType.toLowerCase()) {
    case 'mysql':
      // mysqlConfig debe exportar una función que cree la conexión
      return await mysqlConfig();
    case 'postgresql':
      // postgresqlConfig exporta la conexión a PostgreSQL
      return await postgresqlConfig();
    case 'mongodb':
      // mongodbConfig exporta una función para conectar a MongoDB
      return await mongodbConfig();
    default:
      throw new Error(`Tipo de base de datos no soportado: ${dbType}`);
  }
};
