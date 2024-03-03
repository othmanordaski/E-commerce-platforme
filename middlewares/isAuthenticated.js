const { verifyJwtToken } = require('../helpers/jsonWebToken'); // Assuming verifyToken function is imported correctly

exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.tokenauth || null;

        if (!token) {
            return res.status(401).json({ message: 'Empty token. Please login to access this resource.' });
        }

        const verify = verifyJwtToken(token);

        if (!verify) {
            return res.status(401).json({ message: 'Session not found. Please login again.' });
        }

        req.user = verify;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
