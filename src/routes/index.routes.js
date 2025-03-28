// src/routes/index.routes.js
import { Router } from 'express';

import authRoutes       from '../modules/auth/routes/auth.routes.js';
import companyRoutes    from '../modules/companies/routes/company.routes.js';

// Se pueden importar otras rutas (por ejemplo, de inventario, contabilidad, etc.)

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/companies', companyRoutes);

export default router;
