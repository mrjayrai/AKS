const mongoose = require('mongoose');

const OrderUserSchema = new mongoose.Schema({
    customerid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 } 
    }],
    totalPrice: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    },
    orderCompletedOn: { 
        type: Date,
        validate: {
            validator: function(value) {
                return !value || value >= this.orderDate;
            },
            message: 'Order completion date must be after order date.'
        }
    },
    ModeofPayment: {
        type: String,
        enum: ['COD', 'Advance', 'Online'],
        default: 'COD'
    },
    deliveryAddress: { 
        type: String, 
        required: true 
    },
    discount: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    taxslabs: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    refund: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Order', OrderUserSchema);
