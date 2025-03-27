// tests/unit/health.test.js
import request from 'supertest'; // Supertest permite hacer peticiones HTTP a la aplicación
import app from '../../src/app.js'; // Importa la aplicación Express que configuraste

describe('GET /api/health', () => {
  it('debe responder con estado OK, ambiente y tenantId', async () => {
    const tenantId = 'tenant123';
    
    const res = await request(app)
      .get('/api/health')
      .set('x-tenant-id', tenantId); // Simula enviar el header para multitenencia

    // Verifica el código de estado HTTP
    expect(res.statusCode).toEqual(200);
    
    // Verifica que la respuesta contenga las propiedades esperadas
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('environment');
    expect(res.body).toHaveProperty('tenantId', tenantId);
    expect(res.body).toHaveProperty('timestamp');
  });
});
