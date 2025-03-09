const express = require('express');
const { registerWarehouse } = require('../controllers/WarehouseRegister');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
router.post('/register',authMiddleware,registerWarehouse);

module.exports = router;