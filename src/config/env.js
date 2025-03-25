import dotenv from "dotenv";

dotenv.config();

import Joi from 'joi';

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  MONGODB_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  CORS_ORIGIN: Joi.string().default('*'),
  CORS_METHODS: Joi.string()
}).unknown();

const { value: env, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Configuración de entorno inválida: ${error.message}`);
}

export { env };