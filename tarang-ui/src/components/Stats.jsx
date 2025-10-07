import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import { fetchStats } from '../utils/api';

const StatsCard = ({ title, value }) => (
    <motion.div
        className="stat-card support-card" // Reusing support-card style
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h3>{value}</h3>
        <p>{title}</p>
    </motion.div>
);

const Stats = () => {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchStats();
                setStatsData(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                // Fallback to static data
                setStatsData([
                    { title: 'Missions Conducted', value: '1,250' },
                    { title: 'Lives Saved', value: '4,800' },
                    { title: 'Volunteers Engaged', value: '10,000+' },
                    { title: 'Coastal Communities Served', value: '350' },
                ]);
            }
        };
        getStats();
    }, []);

    return (
        <div className="stats-container support-grid"> {/* Reusing support-grid style */}
            {statsData.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} />
            ))}
        </div>
    );
};

export default Stats;
