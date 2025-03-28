// src/modules/companies/models/company.model.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  taxId: { type: String, required: true, unique: true },   // Ej: NIT, RUC, etc.
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  country: { type: String, required: true },   // Código del país (ej: "CO", "PE", "MX")
  plan: { 
    type: String, 
    enum: ['Gratuito', 'Básico', 'Avanzado', 'Custom'], 
    default: 'Gratuito' 
  },
  // Otros campos relevantes de la compañía

  tenantId: { type: String, required: true }  
  // Identificador usado en el sistema multi-tenant
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;
