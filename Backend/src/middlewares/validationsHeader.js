const jwt = require('jsonwebtoken');
const { token_key } = require('../config');

const validHeaders = (req, res, next, userType) => {
    const token = req.headers['access-token']

    try {
        if (!token) {
            return res.status(500).json({ msg: 'Not provided token' });
        }

        jwt.verify(token, token_key, (err, decode) => {
            if (err) {
                return res.status(500).json({ msg: 'Invalid token' });
            }

            switch (userType) {
                case 'Admin':
                    if (decode.role !== 1) {
                        return res.status(401).json({ msg: 'Permission denied' });
                    }

                    break;

                case 'Client':
                    if (decode.role !== 2) {
                        return res.status(401).json({ msg: 'Permission denied' });
                    }

                    break;

            }

            req.decode = decode;

            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error validating token' });
    }
}

module.exports = {
    validHeaders,
};