// config/settings.js

// Importa de forma estática cada configuración de entorno
import { envConfig as devConfig } from './environments/development.js';
import { envConfig as prodConfig } from './environments/production.js';
import { envConfig as testConfig } from './environments/testing.js';

// Selecciona la configuración adecuada en función de NODE_ENV
let config;
switch (process.env.NODE_ENV) {
  case 'production':
    config = prodConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  case 'development':
  default:
    config = devConfig;
    break;
}

export const env = config;
