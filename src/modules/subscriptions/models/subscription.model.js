// src/modules/subscriptions/models/subscription.model.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  // Relación única con la compañía que adquirió el plan
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, unique: true },
  
  // Información del plan contratado
  planName: { type: String, required: true, enum: ['Gratuito', 'Básico', 'Avanzado', 'Custom'] },
  
  // Tipo de pago: mensual, anual o por cantidad de comprobantes
  paymentType: { type: String, required: true, enum: ['monthly', 'annual', 'perReceipt'] },
  
  // Fecha de contratación del plan
  contractDate: { type: Date, required: true, default: Date.now },
  
  // Fecha de vencimiento del plan (según el tipo de pago o acuerdo)
  expirationDate: { type: Date, required: true },
  
  // Estado de la suscripción: activa, inactiva o vencida (overdue)
  status: { type: String, required: true, enum: ['active', 'inactive', 'overdue'], default: 'active' },
  
  // Límites de uso asociados al plan
  usageLimits: {
    maxInvoices: { type: Number, default: 0 },
    storageGB: { type: Number, default: 0 },
    maxUsers: { type: Number, default: 0 }
    // Puedes agregar más límites según los requerimientos del plan
  }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
