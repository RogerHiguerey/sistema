// src/modules/companies/services/company.service.js
import { v4 as uuidv4 } from 'uuid';
import BaseService from '../../../core/base-service.js';
import CompanyRepository from '../repositories/company.repository.js';
import SubscriptionRepository from '../../subscriptions/repositories/subscription.repository.js';
import { addMonths, addYears } from 'date-fns';
// Utilidad para calcular fechas (puedes usar moment.js u otra librería)

// Ejemplo de configuración de planes
// Opcional: Define límites por plan (esto puede venir desde configuración externa)
const planConfigurations = {
  Gratuito: { paymentType: 'perReceipt', monthsDuration: 1, usageLimits: { maxInvoices: 50, storageGB: 1, maxUsers: 5 } },
  Básico:   { paymentType: 'monthly', monthsDuration: 1, usageLimits: { maxInvoices: 500, storageGB: 5, maxUsers: 20 } },
  Avanzado: { paymentType: 'annual', yearsDuration: 1, usageLimits: { maxInvoices: 5000, storageGB: 20, maxUsers: 100 } },
  Custom:   { paymentType: 'monthly', monthsDuration: 1, usageLimits: { maxInvoices: 0, storageGB: 0, maxUsers: 0 } } // Los valores se definirán en el plan personalizado

};

export default class CompanyService extends BaseService {
  constructor() {
    super(new CompanyRepository());
    this.subscriptionRepository = new SubscriptionRepository();
  }

  /**
   * Registra una nueva compañía y crea su suscripción inicial.
   * Si no se envía un tenantId, se genera automáticamente.
   * @param {Object} companyData - Datos de la compañía.
   * @returns {Promise<Object>} - Objeto con la compañía y la suscripción.
   */
  
  async registerCompany(companyData) {
    // Genera automáticamente el tenantId si no se proporciona.
    if (!companyData.tenantId) {
      companyData.tenantId = uuidv4();
    }

    // Crea la compañía en la base de datos.
    const company = await this.repository.create(companyData);

    // Obtiene la configuración del plan seleccionado.
    const planConfig = planConfigurations[company.plan];
    if (!planConfig) {
      throw new Error(`Plan no configurado: ${company.plan}`);
    }

    // Calcula la fecha de vencimiento de la suscripción.
    let expirationDate;
    if (planConfig.monthsDuration) {
      expirationDate = addMonths(new Date(), planConfig.monthsDuration);
    } else if (planConfig.yearsDuration) {
      expirationDate = addYears(new Date(), planConfig.yearsDuration);
    } else {
      throw new Error('Duración del plan no definida');
    }

    // Crea la suscripción inicial asociada a la compañía.
    const subscriptionData = {
      company: company._id,
      planName: company.plan,
      paymentType: planConfig.paymentType,
      contractDate: new Date(),
      expirationDate,
      status: 'active',
      usageLimits: planConfig.usageLimits
    };

    const subscription = await this.subscriptionRepository.create(subscriptionData);
    return { company, subscription };
  }
}
