// tests/integration/auth.test.js
import request from 'supertest';
import app from '../../src/app.js';
import { connectInMemoryDB, clearDB, closeInMemoryDB } from '../setup/mongoMemoryServer.js';
import User from '../../src/modules/auth/models/user.model.js';

const testUser = {
  name: 'Test User',
  email: `testuser_${Date.now()}@example.com`,
  password: 'TestPassword123!',
  tenantId: 'tenant_test'
};

describe('Authentication Endpoints', () => {
  // Antes de ejecutar todas las pruebas, inicia la base de datos en memoria
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  // Después de cada prueba, limpia la base de datos para mantener el aislamiento
  afterEach(async () => {
    await clearDB();
  });

  // Después de todas las pruebas, cierra la conexión y detén MongoMemoryServer
  afterAll(async () => {
    await closeInMemoryDB();
  });

  // Aquí van tus casos de prueba (registro, login, etc.)
  it('debe registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', testUser.email);
    expect(res.body).not.toHaveProperty('password');
  });

  it('debe iniciar sesión correctamente y devolver un token', async () => {
    // Primero, registrar el usuario para luego intentar el login
    await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .set('Accept', 'application/json');

    const loginPayload = {
      email: testUser.email,
      password: testUser.password
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginPayload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('debe fallar el inicio de sesión con contraseña incorrecta', async () => {
    // Registrar el usuario
    await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .set('Accept', 'application/json');

    const loginPayload = {
      email: testUser.email,
      password: 'WrongPassword'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginPayload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});
