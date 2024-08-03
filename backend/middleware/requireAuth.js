const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const requireAuth = (role) => {
    return async (req, res, next) => {
        // verify authentication
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];

        try {
            const { _id } = jwt.verify(token, process.env.SECRET);
            const user = await User.findOne({ _id }).select('_id role');

            if (!user || (role === 'admin' && user.role !== 'admin')) {
                console.log('User role mismatch');
                return res.status(403).json({ error: 'Access denied' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ error: 'Request is not authorized' });
        }
    };
};

module.exports = requireAuth;
