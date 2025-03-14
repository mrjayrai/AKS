const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['superAdmin', 'admin', 'warehouseManager', 'salesMan', 'customer'], 
        default: 'customer' 
    },
    permissions: [{ type: String }], 
    createdAt: { type: Date, default: Date.now },
    address: { type: String, required: true },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: function() { return this.role === 'salesMan'; } 
    } // Only required if user is a salesman
});

// Pre-save hook to assign default permissions and validate salesmen
UserSchema.pre('save', async function (next) {
    if (this.role === 'superAdmin') {
        this.permissions = ['g_manage_users', 'g_manage_orders', 'g_manage_inventory', 'g_manage_finances'];
    } else if (this.role === 'admin') {
        this.permissions = ['manage_orders', 'manage_inventory', 'manage_finances'];
    } else if (this.role === 'warehouseManager') {
        this.permissions = ['manage_inventory'];
    } else if (this.role === 'salesMan') {
        this.permissions = ['manage_orders_delivery'];

        // Ensure salesMan is assigned to an admin
        if (!this.assignedTo) {
            return next(new Error('Salesman must be assigned to an Admin or SuperAdmin'));
        }

        // Check if assignedTo user exists and is an admin/superAdmin
        const assignedAdmin = await mongoose.model('User').findById(this.assignedTo);
        if (!assignedAdmin || !['admin', 'superAdmin'].includes(assignedAdmin.role)) {
            return next(new Error('Salesman can only be assigned to an Admin or SuperAdmin'));
        }
    } else {
        this.permissions = ['manage_orders_customer'];
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
