const mongoose = require('mongoose');
const User = require('./User'); 

const WarehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    
    
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    createdAt: { type: Date, default: Date.now }
});


WarehouseSchema.pre('save', async function (next) {
    try {
        
        const ownerUser = await User.findById(this.owner);
        if (!ownerUser || (ownerUser.role !== 'superAdmin' && ownerUser.role !== 'admin')) {
            throw new Error("Owner must be a SuperAdmin or Admin");
        }

        
        if (this.manager) {
            const managerUser = await User.findById(this.manager);
            if (!managerUser || managerUser.role !== 'warehouseManager') {
                throw new Error("Manager must be a Warehouse Manager");
            }
        }

        next(); 
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
