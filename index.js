const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/db');
const UserSchema = require('./models/User');
const WarehouseSchema= require('./models/WareHouse');
const ProductSchema = require('./models/Product');
const InventorySchema = require('./models/Inventory');
const OrderSchema = require('./models/Order');
const ShopSchema = require('./models/Shop');
const CalendarSchema = require('./models/Calendar');
const UserRoutes = require('./routes/UserRoutes');
const WareHouseRoutes = require('./routes/WareHouseRoutes');
// UserSchema();


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Node.js Server is Running');
});

app.use('/api/users',UserRoutes);
app.use('/api/warehouse',WareHouseRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});