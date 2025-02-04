import React, { useState } from 'react';
import './Campaign.css';

const Campaign = ({ campaignData }) => {
    const [showComments, setShowComments] = useState(false);

    if (!campaignData) {
        return <p>No campaign data available.</p>;
    }

    return (
        <div className="campaign-card">
            {/* Campaign Header */}
            <div className="d-flex justify-content-between">
                <div>
                    <h3 className="campaign-title">{campaignData.title}</h3>
                    <p className="campaign-description">{campaignData.description}</p>
                </div>
                {campaignData.campaignPicture && (
                    <img src={campaignData.campaignPicture} alt={campaignData.title} className="campaign-image" />
                )}
            </div>

            {/* Campaign Owner & Dates */}
            <div className="campaign-details d-flex justify-content-between">
                <div className='d-flex gap-2' style={{ cursor: 'pointer' }}>
                    {campaignData.ownerImg && (
                        <img src={campaignData.ownerImg} className='owner-img' alt="Owner" />
                    )}
                    <div>{campaignData.owner}</div>
                </div>

                <div className="campaign-dates d-flex gap-2">
                    <span className="start-date"><strong>Start:</strong> {campaignData.startDate}</span>
                    <span className="end-date"><strong>End:</strong> {campaignData.endDate}</span>
                </div>
            </div>

            {/* Like & Comment Buttons */}
            <div className="campaign-actions">
                <button className="like-button">❤️ {campaignData.likes || 0}</button>
                <button className="comment-button" onClick={() => setShowComments(!showComments)}>
                    💬 {campaignData.comments?.length || 0}
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="campaign-comments">
                    {campaignData.comments && campaignData.comments.length > 0 ? (
                        campaignData.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <strong>{comment.username}:</strong> {comment.text}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Campaign;
