import React, { useState } from 'react';
import './Campaign.css';

const Campaign = ({ campaign }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="campaign-card">
            <h3 className="campaign-title">{campaign.title}</h3>
            <div className="campaign-dates">
                <span className="start-date">Start: {campaign.startDate}</span>
                <span className="end-date">End: {campaign.endDate}</span>
            </div>
            <img src={campaign.imageUrl} alt={campaign.title} className="campaign-image" />
            <p className="campaign-description">{campaign.description}</p>
            <div className="campaign-actions">
                <button className="like-button">❤️ {campaign.likes}</button>
                <button className="comment-button" onClick={() => setShowComments(!showComments)}>
                    💬 {campaign.comments.length}
                </button>
            </div>
            {showComments && (
                <div className="campaign-comments">
                    {campaign.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.username}:</strong> {comment.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Campaign;
