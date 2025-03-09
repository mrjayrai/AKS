const Warehouse = require('../models/WareHouse');
const User = require('../models/User');

const registerWarehouse = async (req, res) => {
    try {
        const { name, location, owner, manager } = req.body;

        
        const ownerUser = await User.findById(owner);
        if (!ownerUser || (ownerUser.role !== 'superAdmin' && ownerUser.role !== 'admin')) {
            return res.status(400).json({ message: "Owner must be a SuperAdmin or Admin" });
        }

        
        if (manager) {
            const managerUser = await User.findById(manager);
            if (!managerUser || managerUser.role !== 'warehouseManager') {
                return res.status(400).json({ message: "Manager must be a Warehouse Manager" });
            }
        }

        
        const warehouse = new Warehouse({ name, location, owner, manager });
        await warehouse.save();

        res.status(201).json({ message: "Warehouse registered successfully", warehouse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerWarehouse };