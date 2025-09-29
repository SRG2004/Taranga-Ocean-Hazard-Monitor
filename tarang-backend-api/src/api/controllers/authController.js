
const { admin } = require('../../config/firebase');
const User = require('../models/user');

exports.verifyToken = async (req, res) => {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
        return res.status(401).send({ error: 'Firebase token is required.' });
    }

    try {
        // const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        // const { uid, email } = decodedToken;

        // let user = await User.findOne({ firebaseId: uid });

        // if (!user) {
        //     // Create a new user if not found
        //     const newUser = new User({
        //         firebaseId: uid,
        //         email: email,
        //         username: email.split('@')[0], // Default username
        //         name: email.split('@')[0], // Default name
        //     });
        //     user = await newUser.save();
        // }

        // res.status(200).send({ 
        //     userId: user._id,
        //     username: user.username
        // });

    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        res.status(403).send({ error: 'Invalid or expired token.' });
    }
};
