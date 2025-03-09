const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['superAdmin', 'admin', 'warehouseManager','salesMan','customer'], 
        default: 'customer' 
    },
    permissions: [{ type: String }], 
    createdAt: { type: Date, default: Date.now },
    address:{type:String, required:true}
});

// Pre-save hook to assign default permissions based on role
UserSchema.pre('save', function (next) {
    if (this.role === 'superAdmin') {
        this.permissions = ['g_manage_users', 'g_manage_orders', 'g_manage_inventory', 'g_manage_finances'];
    } else if (this.role === 'admin') {
        this.permissions = ['manage_orders', 'manage_inventory','manage_finances'];
    } else if(this.role === 'warehouseManager') {
        this.permissions = ['manage_inventory'];
    } else if(this.role === 'salesMan'){
        this.permissions = ['manage_orders_delivery'];
    } else {
        this.permissions = ['manage_orders_customer'];
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
