
const db = require('../../db');

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await db('users').where({ id }).first();
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: 'Failed to fetch user.' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, language, role } = req.body;

    // Ensure that only admins can change roles
    if (role && req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Forbidden: Insufficient permissions to change role.' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (language) updates.language = language;
    if (role) updates.role = role;

    try {
        const [updatedUser] = await db('users').where({ id }).update(updates).returning('*');
        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found.' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ error: 'Failed to update user.' });
    }
};
