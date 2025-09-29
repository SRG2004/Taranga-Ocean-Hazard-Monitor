
const { admin } = require('../config/firebase');
const User = require('../api/models/user');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Unauthorized: No token provided.' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = await User.findOne({ firebase_uid: decodedToken.uid });

        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        req.user = user; // Attach user object to the request object
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).send({ error: 'Unauthorized: Invalid token.' });
    }
};

module.exports = authMiddleware;
