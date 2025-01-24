import React from 'react';
import './Advertisements.css';

const Advertisements = () => {
    const ads = [
        {
            id: 1,
            imageUrl: 'https://plus.unsplash.com/premium_photo-1661425715124-310ec1b49b8a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25saW5lJTIwYWR2ZXJ0aXNpbmd8ZW58MHx8MHx8fDA%3D',
            companyName: 'Eco Ventures',
            website: 'https://plus.unsplash.com/',
        },
        {
            id: 2,
            imageUrl: 'https://pleated-jeans.com/wp-content/uploads/2021/04/group-project-meme-40.jpg',
            companyName: 'Ocean Blue',
            website: 'https://oceanblue.org',
        },
    ];

    return (
        <div className="advertisements-section">
            <h3 className="ads-heading">Business Ads</h3>
            <div className="ads-container">
                {ads.map((ad) => (
                    <div key={ad.id} className="ad-card">
                        <a href={ad.website} target="_blank" rel="noopener noreferrer" className="ad-link">
                            <img src={ad.imageUrl} alt={ad.companyName} className="ad-image" />
                            <h4 className="ad-company">{ad.companyName}</h4>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Advertisements;
