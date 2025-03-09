const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = async(req,res) => {
    try{
        const { email , password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.jwtsecret,
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions,
                address: user.address
            }
        });

    }catch(error){
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = { Login };