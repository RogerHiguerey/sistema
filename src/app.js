import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from './config/env.js';

// 1. Configuración inicial
const app = express();
const port = env.PORT;

// 2. Middlewares esenciales
app.use(express.json());
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: env.CORS_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 3. Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

// 4. Rutas básicas
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 5. Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(`🔥 Error en ${req.method} ${req.path}:`, err);
  
  res.status(500).json({
    error: env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
    stack: env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 6. Inicio del servidor
const startServer = async () => {
  await connectDB();
  
  app.listen(port, () => {
    console.log(`
    🚀 Servidor listo en: http://localhost:${port}
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    Entorno: ${env.NODE_ENV}
    MongoDB: ${mongoose.connection.host}
    Versión: ${process.version}
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ 
    `);
  });
};

// 7. Iniciar aplicación
startServer().catch(error => {
  console.error('❌ Fallo en la inicialización:', error);
  process.exit(1);
});

// Estructura de archivos y carpetas implementada
// ├── /config
// │   ├── env.js
// ├── /controllers
// │   ├── taxController.js
// │   ├── userController.js
// ├── /middlewares
// │   ├── authMiddleware.js
// │   ├── errorHandler.js
// ├── /models
// │   ├── taxModel.js
// │   ├── userModel.js
// ├── /routes
// │   ├── taxRoutes.js
// │   ├── userRoutes.js
// ├── /services
// │   ├── taxService.js
// ├── /utils
// │   ├── logger.js
// ├── /tests
// │   ├── tax.test.js
// ├── app.js
// ├── server.js
// ├── .env
// ├── .gitignore
// ├── package.json
// ├── README.md