// config/database/mysql.config.js
import mysql from 'mysql2/promise';
import { envConfig as env } from '../environments/development.js';

/**
 * Crea una conexión a MySQL.
 * @returns {Promise<Connection>} Instancia de conexión MySQL.
 */
const createMySQLConnection = async () => {
  const connection = await mysql.createConnection({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    port: env.MYSQL_PORT
  });
  console.log('✅ Conectado a MySQL');
  return connection;
};

export default createMySQLConnection;
