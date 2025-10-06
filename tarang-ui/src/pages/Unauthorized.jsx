import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Unauthorized Access</h2>
            <p>You do not have the necessary permissions to view this page.</p>
            <Link to="/">Go to Homepage</Link>
        </div>
    );
};

export default Unauthorized;
