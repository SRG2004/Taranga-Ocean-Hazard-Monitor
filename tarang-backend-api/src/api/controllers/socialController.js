
const db = require('../../config/db');

exports.createSocialPost = async (req, res) => {
    try {
        const { platform, username, text, media_url, sentiment } = req.body;

        db.run(
            'INSERT INTO social_posts (platform, username, text, media_url, sentiment) VALUES (?, ?, ?, ?, ?)',
            [platform, username, text, media_url, sentiment],
            function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Error creating social post', error: err.message });
                }
                res.status(201).json({ id: this.lastID, platform, username, text, media_url, sentiment });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error creating social post', error: error.message });
    }
};

exports.getSocialSummary = async (req, res) => {
    try {
        db.get('SELECT COUNT(*) as totalPosts FROM social_posts', (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting social summary', error: err.message });
            }

            const totalPosts = result.totalPosts;

            db.all('SELECT sentiment, COUNT(*) as count FROM social_posts GROUP BY sentiment', (err, rows) => {
                if (err) {
                    return res.status(500).json({ message: 'Error getting social summary', error: err.message });
                }

                const sentiment = {
                    positive: 0,
                    negative: 0,
                    neutral: 0
                };

                let totalSentiment = 0;
                rows.forEach(row => {
                    sentiment[row.sentiment] = row.count;
                    totalSentiment += row.count;
                });

                if (totalSentiment > 0) {
                    for (const key in sentiment) {
                        sentiment[key] = sentiment[key] / totalSentiment;
                    }
                }

                res.status(200).json({ totalPosts, sentiment });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting social summary', error: error.message });
    }
};

exports.getSocialPosts = async (req, res) => {
    try {
        db.all('SELECT * FROM social_posts', (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting social posts', error: err.message });
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting social posts', error: error.message });
    }
};
