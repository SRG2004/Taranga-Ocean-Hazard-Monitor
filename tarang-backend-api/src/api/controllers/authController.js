const { admin } = require('../../config/firebase');
const db = require('../../db');
const { v4: uuidv4 } = require('uuid'); // Using uuid for primary keys

exports.verifyToken = async (req, res) => {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
        return res.status(401).send({ error: 'Firebase token is required.' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        const { uid, email } = decodedToken;

        let user = await db('users').where({ firebase_uid: uid }).first();

        if (!user) {
            const newUser = {
                id: uuidv4(),
                firebase_uid: uid,
                email: email,
                role: 'citizen' // Default role
            };
            [user] = await db('users').insert(newUser).returning('*');
        }

        res.status(200).send({ 
            userId: user.id,
            role: user.role 
        });

    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        res.status(403).send({ error: 'Invalid or expired token.' });
    }
};