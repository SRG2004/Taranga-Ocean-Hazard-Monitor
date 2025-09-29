
const db = require('../../config/db');

exports.getUserById = async (req, res) => {
    try {
        db.get('SELECT id, name, username, email, profilePicture, bio FROM users WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting user', error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(row);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, username, profilePicture, bio } = req.body;
        const fields = [];
        const values = [];

        if (name) {
            fields.push('name = ?');
            values.push(name);
        }
        if (username) {
            fields.push('username = ?');
            values.push(username);
        }
        if (profilePicture) {
            fields.push('profilePicture = ?');
            values.push(profilePicture);
        }
        if (bio) {
            fields.push('bio = ?');
            values.push(bio);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        values.push(req.params.id);

        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

        db.run(sql, values, function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error updating user', error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};
