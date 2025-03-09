const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        
        const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;

        if (!process.env.jwtsecret) {
            return res.status(500).json({ message: 'Internal Server Error: JWT Secret is missing' });
        }

        const decoded = jwt.verify(tokenValue, process.env.jwtsecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = authMiddleware;
