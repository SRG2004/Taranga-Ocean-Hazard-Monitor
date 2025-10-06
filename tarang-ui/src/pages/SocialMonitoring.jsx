import React, { useState } from 'react';
import '../App.css';

// Dummy data for social media posts
const dummyPosts = [
    { id: 1, platform: 'Twitter', user: 'OceanWatcher', content: 'Huge waves reported near the coast of #Swellendam. All boaters should be cautious. #ocean #waves' },
    { id: 2, platform: 'Facebook', user: 'MarineLifeUpdates', content: 'A pod of whales has been spotted moving north. Please maintain a safe distance.' },
    { id: 3, platform: 'Twitter', user: 'CoastGuardReport', content: 'High tide warning for the next 48 hours. Avoid low-lying coastal areas. #HighTide #SafetyFirst' },
    { id: 4, platform: 'Instagram', user: 'DeepSeaExplorer', content: 'Just captured this amazing footage of a coral reef. We must protect these ecosystems! #coral #oceanlife' },
];

const SocialMonitoring = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState(dummyPosts);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            setPosts(dummyPosts);
            return;
        }

        const filteredPosts = dummyPosts.filter(post =>
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPosts(filteredPosts);
    };

    return (
        <div className="social-monitoring-container">
            <h2>Social Media Monitoring</h2>
            <p>Monitor social media for keywords and hashtags related to ocean hazards.</p>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Enter keyword or hashtag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="posts-feed">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="social-post">
                            <div className="post-header">
                                <span className="platform-icon">{post.platform.charAt(0)}</span>
                                <strong>{post.user}</strong> on {post.platform}
                            </div>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default SocialMonitoring;
