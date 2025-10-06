
// const db = require('../../config/db');

const mockSocialPosts = [
    { id: 1, platform: 'Twitter', username: 'user1', text: 'This is a great day!', media_url: null, sentiment: 'positive' },
    { id: 2, platform: 'Facebook', username: 'user2', text: 'Feeling sad today.', media_url: null, sentiment: 'negative' },
];

exports.createSocialPost = async (req, res) => {
    try {
        const { platform, username, text, media_url, sentiment } = req.body;
        const newPost = { id: Date.now(), platform, username, text, media_url, sentiment };
        mockSocialPosts.push(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating social post', error: error.message });
    }
};

exports.getSocialSummary = async (req, res) => {
    try {
        const totalPosts = mockSocialPosts.length;
        const sentiment = {
            positive: 0.5,
            negative: 0.3,
            neutral: 0.2
        };
        res.status(200).json({ totalPosts, sentiment });
    } catch (error) {
        res.status(500).json({ message: 'Error getting social summary', error: error.message });
    }
};

exports.getSocialPosts = async (req, res) => {
    try {
        res.status(200).json(mockSocialPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error getting social posts', error: error.message });
    }
};
