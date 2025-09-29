
const { admin } = require('../../config/firebase');

exports.getUploadUrl = async (req, res) => {
    const { fileName, contentType } = req.body;

    if (!fileName || !contentType) {
        return res.status(400).send({ error: 'fileName and contentType are required.' });
    }

    const bucket = admin.storage().bucket();
    const file = bucket.file(`media/${Date.now()}_${fileName}`);

    const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: contentType,
    };

    try {
        const [uploadUrl] = await file.getSignedUrl(options);
        const mediaUrl = `gs://${bucket.name}/${file.name}`;
        res.status(200).send({ uploadUrl, mediaUrl });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).send({ error: 'Could not generate upload URL.' });
    }
};
