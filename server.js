// server.js
import 'dotenv/config';  // Carga las variables de entorno
import app from './src/app.js';
import { env } from './config/settings.js'; // Se usa settings.js en lugar de env.js
import { createDatabaseConnection } from './config/database/database.factory.js';

const port = env.PORT;

const startServer = async () => {
  try {
    // Conectar a la base de datos utilizando el factory (soporta MongoDB, MySQL, PostgreSQL, etc.)
    const dbConnection = await createDatabaseConnection();
    console.log('✅ Conexión a la base de datos exitosa');

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`
      🚀 Servidor listo en: http://localhost:${port}
      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
      Entorno: ${env.NODE_ENV}
      Base de datos: ${env.DB_TYPE}
      Versión: ${process.version}
      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ 
      `);
    });
  } catch (error) {
    console.error('❌ Fallo al conectar a la base de datos:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer().catch(error => {
  console.error('❌ Fallo en la inicialización:', error);
  process.exit(1);
});
