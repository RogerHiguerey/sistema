// src/modules/companies/routes/company.routes.js
import { Router } from 'express';
import { registerCompany } from '../controllers/company.controller.js';

const router = Router();

// Endpoint para registrar una nueva compañía
router.post('/', registerCompany);

// Puedes añadir otros endpoints: GET, PUT, DELETE, etc.
export default router;
