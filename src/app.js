// src/app.js
import express from 'express';
import cors from 'cors';
// Se importa la configuración centralizada (settings.js) en lugar de env.js
import { env } from '../config/settings.js';
// Importa el middleware para la gestión de multitenencia
import MultiTenantManager from './core/multi-tenant-manager.js';
// Importa el archivo central de rutas, donde se agregarán todos los endpoints de los módulos
import apiRoutes from './routes/index.routes.js';

const app = express();

// 1. Middlewares esenciales
app.use(express.json());
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: env.CORS_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 2. Middleware de multitenencia
// Extrae el tenantId de la solicitud y lo asigna a req.tenantId
app.use(MultiTenantManager.tenantMiddleware);

// 3. Rutas básicas y centralizadas
// Ruta de health check para verificar el estado del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: env.NODE_ENV,
    tenantId: req.tenantId || null,  // Verifica que el middleware inyecta el tenantId
    timestamp: new Date().toISOString()
  });
});

// Integra todas las rutas definidas en los módulos (por ejemplo, auth, clients, etc.)
app.use(apiRoutes);

// 4. Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(`🔥 Error en ${req.method} ${req.path}:`, err);
  res.status(500).json({
    error: env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
    stack: env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;