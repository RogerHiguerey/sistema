// config/database/mongodb.config.js
import mongoose from 'mongoose';
import { env } from '../../config/settings.js';

/**
 * Conecta a MongoDB utilizando Mongoose.
 * @returns {Promise<Connection>} La conexión activa de Mongoose.
 */
const createMongoDBConnection = async () => {
  try {
    // Se conecta usando únicamente la URI de MongoDB definida en el entorno.
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Error en la conexión a MongoDB:', error);
    throw error;
  }
};

export default createMongoDBConnection;
