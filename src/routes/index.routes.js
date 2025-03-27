// src/routes/index.routes.js
import { Router } from 'express';
import authRoutes from '../modules/auth/routes/auth.routes.js';

const router = Router();

router.use('/api/auth', authRoutes);

export default router;
