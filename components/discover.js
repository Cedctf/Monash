import React from 'react';
import collectionsData from '@/components/discover.json';
import "../styles/discover.css";

const DiscoverPage = () => {

    return (
        <div className="discover-page">
            <div className="discover-header">
                <div className="tabs">
                    <button className="tab active">Top</button>
                    <button className="tab">Inscriptions</button>
                </div>
                <p>Discover</p>
            </div>
        </div>
    );
};

export default DiscoverPage;