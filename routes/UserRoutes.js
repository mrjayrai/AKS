const express = require('express');
const {registerUser } = require('../controllers/UserRegister');
const { Login } = require('../controllers/Login');

const router = express.Router();
router.post('/register', registerUser);
router.post('/login',Login);

module.exports = router;