// config/environments/production.js

export const envConfig = {
    PORT: process.env.PORT,

    NODE_ENV: process.env.NODE_ENV,

    DB_TYPE: process.env.DB_TYPE,
    // mongodbConfig
    MONGODB_URI: process.env.MONGODB_URI,
    // mysqlConfig
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
    // postgresqlConfig
    PG_HOST: process.env.PG_HOST,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_PORT: process.env.PG_PORT,

    JWT_SECRET: process.env.JWT_SECRET,
    
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    CORS_METHODS: process.env.CORS_METHODS
  };
  