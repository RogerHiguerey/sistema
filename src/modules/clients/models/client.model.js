import mongoose from 'mongoose';

/**
 * Esquema de Cliente para Sistema ERP Multiteniente
 * @description Modelo que representa un cliente en el sistema
 */

const ClientSchema = new mongoose.Schema({
    tenantId: {
        type: String, 
        required: true,
        index: true
    },
    personalInfo: {
        identificationType: {
            type: String,
            enum: [
                'DNI', 'RUC', 'PASSPORT', 'CEDULA', 'NIE', 'OTHER'
            ],
            required: true
        },
        identificactionNumber: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        businessName: {
            type: String,
            trim: true
        }
    },
    contactInfo: {
        email: {
            type: String,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
                message: (props) => `${props.value} no es un email válido!`
            }
        },
        phoneNumber: {
            type: String,
            trim: true
        },
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            postalCode: String
        }
    },
    fiscalInfo: {
        taxRegime: {
            type: String,
            enum: [
                'GENERAL', 
                'SIMPLIFIED', 
                'AGRICULTURAL', 
                'OTHER'
            ]
        },
        vatNumber: String,
        fiscalAddress: String
    },
    businessInfo: {
        segment: {
            type: String,
            enum: [
                'RETAIL', 
                'WHOLESALE', 
                'CORPORATE', 
                'GOVERNMENT', 
                'OTHER'
            ]
        },
        annualRevenue: Number,
        employeeCount: Number
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
        default: 'ACTIVE'
    },
    metadata: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
}, {
    timestamps: true
});

// Índice compuesto para optimizar consultas multiteniente
ClientSchema.index({ tenantId: 1, 'personalInfo.identificactionNumber': 1 });

// Hook para actualizar timestamp de modificación
ClientSchema.pre('save', function(next) {
    this.metadata.updatedAt = Date.now();
    next();
});

export default mongoose.model('Client', ClientSchema);