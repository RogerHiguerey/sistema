// config/environments/testing.js

export const envConfig = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'test',
    DB_TYPE: process.env.DB_TYPE || 'mongodb',

    // mongodbConfig
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_saas_test',
    
    // Se pueden agregar configuraciones específicas para el entorno de testing
    JWT_SECRET: process.env.JWT_SECRET || 'clave_para_testear_asegurate_de_cambiar_esto',
    
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    CORS_METHODS: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE'
  };
  