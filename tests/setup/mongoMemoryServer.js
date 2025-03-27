// tests/setup/mongoMemoryServer.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

/**
 * Inicia la instancia de MongoDB en memoria y conecta Mongoose.
 */
export const connectInMemoryDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Conectar a MongoDB sin las opciones deprecated.
  await mongoose.connect(uri);
  console.log('✅ Conectado a MongoDB en memoria');
};

/**
 * Limpia la base de datos en memoria.
 */
export const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

/**
 * Cierra la conexión a la base de datos y detiene la instancia de MongoMemoryServer.
 */
export const closeInMemoryDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
