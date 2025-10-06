const { supabase } = require('../config/supabase');
const User = require('../api/models/user'); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Error verifying token:', error);
            return res.status(403).send({ error: 'Unauthorized: Invalid token.' });
        }

        // Assuming your local User model is linked via a 'supabase_id' field
        const localUser = await User.findOne({ supabase_id: user.id });

        if (!localUser) {
            return res.status(404).send({ error: 'User not found.' });
        }

        req.user = localUser; // Attach the local user object to the request
        next();
    } catch (error) {
        console.error('Unhandled error in auth middleware:', error);
        return res.status(500).send({ error: 'Internal server error.' });
    }
};

module.exports = authMiddleware;
