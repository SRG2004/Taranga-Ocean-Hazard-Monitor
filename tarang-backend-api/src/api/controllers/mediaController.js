
const db = require('../../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload media
exports.uploadMedia = [upload.single('media'), async (req, res) => {
    try {
        const { circleId } = req.body;
        const { filename, path, mimetype, size } = req.file;
        const uploadedBy = req.user.id;

        db.run('INSERT INTO media (filename, path, mimetype, size, uploaded_by, circle_id) VALUES (?, ?, ?, ?, ?, ?)', 
               [filename, path, mimetype, size, uploadedBy, circleId], 
               function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error uploading media', error: err.message });
            }
            res.status(201).json({ message: 'Media uploaded successfully', mediaId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading media', error: error.message });
    }
}];

// Get media by ID
exports.getMediaById = async (req, res) => {
    try {
        db.get('SELECT * FROM media WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting media', error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'Media not found' });
            }
            res.status(200).json(row);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting media', error: error.message });
    }
};

// Get all media for a circle
exports.getMediaForCircle = async (req, res) => {
    try {
        db.all('SELECT * FROM media WHERE circle_id = ?', [req.params.circleId], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting media for circle', error: err.message });
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting media for circle', error: error.message });
    }
};

// Delete media
exports.deleteMedia = async (req, res) => {
    try {
        db.get('SELECT * FROM media WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting media', error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'Media not found' });
            }

            // Delete file from uploads directory
            fs.unlink(row.path, (err) => {
                if (err) {
                    // Log the error but don't block the response
                    console.error('Error deleting file:', err);
                }
            });

            db.run('DELETE FROM media WHERE id = ?', [req.params.id], function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting media', error: err.message });
                }
                res.status(200).json({ message: 'Media deleted successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error: error.message });
    }
};
