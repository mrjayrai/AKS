const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
    },
    supplyingVendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contactNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);  // Ensures a 10-digit number
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);
