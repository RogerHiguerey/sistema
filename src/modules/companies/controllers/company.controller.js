// src/modules/companies/controllers/company.controller.js
import CompanyService from '../services/company.service.js';

const companyService = new CompanyService();

/**
 * Crea una nueva compañía y su suscripción asociada.
 */

export const registerCompany = async (req, res, next) => {
  try {
    // Se asume que el middleware de multitenencia inyecta req.tenantId
    const companyData = { ...req.body, tenantId: req.tenantId };
    const result = await companyService.registerCompany(companyData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Otros controladores (actualizar, obtener, eliminar) se pueden definir de forma similar.
