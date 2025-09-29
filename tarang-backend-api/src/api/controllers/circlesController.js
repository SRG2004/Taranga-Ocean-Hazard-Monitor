
const db = require('../../config/db');

// Create a new circle
exports.createCircle = async (req, res) => {
    try {
        const { name, description } = req.body;
        const createdBy = req.user.id;

        db.run('INSERT INTO circles (name, description) VALUES (?, ?)', [name, description], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error creating circle', error: err.message });
            }
            const circleId = this.lastID;
            db.run('INSERT INTO circle_members (circle_id, user_id) VALUES (?, ?)', [circleId, createdBy], function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Error creating circle', error: err.message });
                }
                res.status(201).json({ id: circleId, name, description, createdBy, members: [createdBy] });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating circle', error: error.message });
    }
};

// Get all circles for a user
exports.getCircles = async (req, res) => {
    try {
        db.all('SELECT c.* FROM circles c JOIN circle_members cm ON c.id = cm.circle_id WHERE cm.user_id = ?', [req.user.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting circles', error: err.message });
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting circles', error: error.message });
    }
};

// Get a circle by ID
exports.getCircleById = async (req, res) => {
    try {
        db.get('SELECT * FROM circles WHERE id = ?', [req.params.id], (err, circle) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting circle', error: err.message });
            }
            if (!circle) {
                return res.status(404).json({ message: 'Circle not found' });
            }
            db.all('SELECT u.id, u.username FROM users u JOIN circle_members cm ON u.id = cm.user_id WHERE cm.circle_id = ?', [req.params.id], (err, members) => {
                if (err) {
                    return res.status(500).json({ message: 'Error getting circle', error: err.message });
                }
                circle.members = members;
                res.status(200).json(circle);
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting circle', error: error.message });
    }
};

// Update a circle
exports.updateCircle = async (req, res) => {
    try {
        const { name, description } = req.body;
        db.run('UPDATE circles SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error updating circle', error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Circle not found' });
            }
            res.status(200).json({ message: 'Circle updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating circle', error: error.message });
    }
};

// Delete a circle
exports.deleteCircle = async (req, res) => {
    try {
        db.run('DELETE FROM circles WHERE id = ?', [req.params.id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error deleting circle', error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Circle not found' });
            }
            db.run('DELETE FROM circle_members WHERE circle_id = ?', [req.params.id], (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting circle', error: err.message });
                }
                res.status(200).json({ message: 'Circle deleted successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting circle', error: error.message });
    }
};

// Add a member to a circle
exports.addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        db.run('INSERT INTO circle_members (circle_id, user_id) VALUES (?, ?)', [req.params.id, userId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error adding member to circle', error: err.message });
            }
            res.status(200).json({ message: 'Member added to circle successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to circle', error: error.message });
    }
};

// Remove a member from a circle
exports.removeMember = async (req, res) => {
    try {
        db.run('DELETE FROM circle_members WHERE circle_id = ? AND user_id = ?', [req.params.id, req.params.userId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error removing member from circle', error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Member not found in circle' });
            }
            res.status(200).json({ message: 'Member removed from circle successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing member from circle', error: error.message });
    }
};

// Add media to a circle
exports.addMediaToCircle = async (req, res) => {
    try {
        const { mediaId } = req.body;
        const circleId = req.params.id;

        db.run('UPDATE media SET circle_id = ? WHERE id = ?', [circleId, mediaId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error adding media to circle', error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Media not found' });
            }
            res.status(200).json({ message: 'Media added to circle successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding media to circle', error: error.message });
    }
};

// Remove media from a circle
exports.removeMediaFromCircle = async (req, res) => {
    try {
        const { mediaId } = req.body;
        const circleId = req.params.id;

        db.run('UPDATE media SET circle_id = NULL WHERE id = ? AND circle_id = ?', [mediaId, circleId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error removing media from circle', error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Media not found in this circle' });
            }
            res.status(200).json({ message: 'Media removed from circle successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing media from circle', error: error.message });
    }
};
