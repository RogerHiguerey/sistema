// config/environments/development.js

export const envConfig = {
    PORT: process.env.PORT || 3000,
    
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    DB_TYPE: process.env.DB_TYPE || 'mongodb',
    // mongodbConfig
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_saas_dev',
    // mysqlConfig
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'secret',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'erp_saas_dev',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    // postgresqlConfig
    PG_HOST: process.env.PG_HOST || 'localhost',
    PG_USER: process.env.PG_USER || 'postgres',
    PG_PASSWORD: process.env.PG_PASSWORD || 'secret',
    PG_DATABASE: process.env.PG_DATABASE || 'erp_saas_dev',
    PG_PORT: process.env.PG_PORT || 5432,
    
    JWT_SECRET: process.env.JWT_SECRET || 'tu_clave_muy_secreta_de_al_menos_32_caracteres',
    
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    CORS_METHODS: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE'
  };
  