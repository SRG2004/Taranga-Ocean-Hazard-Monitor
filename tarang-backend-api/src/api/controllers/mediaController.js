
// const db = require('../../config/db');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

const mockMedia = [
    { id: 1, filename: 'image.jpg', path: '/uploads/image.jpg', mimetype: 'image/jpeg', size: 12345, uploaded_by: 1, circle_id: 1 },
    { id: 2, filename: 'video.mp4', path: '/uploads/video.mp4', mimetype: 'video/mp4', size: 54321, uploaded_by: 2, circle_id: 1 },
];

// Upload media
exports.uploadMedia = async (req, res) => {
    try {
        const { circleId } = req.body;
        // const { filename, path, mimetype, size } = req.file;
        const uploadedBy = req.user.id;

        const newMedia = {
            id: Date.now(),
            filename: 'mock_file.txt',
            path: '/uploads/mock_file.txt',
            mimetype: 'text/plain',
            size: 123,
            uploaded_by: uploadedBy,
            circle_id: circleId
        };
        mockMedia.push(newMedia);
        res.status(201).json({ message: 'Media uploaded successfully', mediaId: newMedia.id });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading media', error: error.message });
    }
};

// Get media by ID
exports.getMediaById = async (req, res) => {
    try {
        const media = mockMedia.find(m => m.id === parseInt(req.params.id));
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Error getting media', error: error.message });
    }
};

// Get all media for a circle
exports.getMediaForCircle = async (req, res) => {
    try {
        const circleMedia = mockMedia.filter(m => m.circle_id === parseInt(req.params.circleId));
        res.status(200).json(circleMedia);
    } catch (error) {
        res.status(500).json({ message: 'Error getting media for circle', error: error.message });
    }
};

// Delete media
exports.deleteMedia = async (req, res) => {
    try {
        const mediaIndex = mockMedia.findIndex(m => m.id === parseInt(req.params.id));
        if (mediaIndex === -1) {
            return res.status(404).json({ message: 'Media not found' });
        }
        mockMedia.splice(mediaIndex, 1);
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error: error.message });
    }
};
