const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    warehouse: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Warehouse', 
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    quantity: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    manufacturingDate:{
        type:Date,
        required:true,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Manufacturing date cannot be in the future.'
        }
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
});


InventorySchema.pre('save', function (next) {
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Inventory', InventorySchema);
