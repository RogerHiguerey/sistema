// config/database/postgresql.config.js
import pkg from 'pg';
const { Client } = pkg;
import { envConfig as env } from '../environments/development.js';

/**
 * Crea una conexión a PostgreSQL.
 * @returns {Promise<Client>} Instancia del cliente de PostgreSQL.
 */
const createPostgreSQLConnection = async () => {
  const client = new Client({
    host: env.PG_HOST,
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DATABASE,
    port: env.PG_PORT
  });
  await client.connect();
  console.log('✅ Conectado a PostgreSQL');
  return client;
};

export default createPostgreSQLConnection;
