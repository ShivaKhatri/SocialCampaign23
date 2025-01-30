import React, { useState } from 'react';
import './Campaign.css';

const Campaign = ({ campaign }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="campaign-card">
            <div className='d-flex justify-content-between'>

            
            <div>

            
            <h3 className="campaign-title">{campaign.title}</h3>
            <p className="campaign-description">{campaign.description}</p>
            </div>
            <img src={campaign.imageUrl} alt={campaign.title} className="campaign-image" />
            </div>
            <div className="campaign-details d-flex justify-content-between">
                <div className='d-flex gap-2 cursor-pointer' style={{cursor:'pointer'}}>
            <img src={campaign.ownerImg} className='owner-img' alt="" />
                <div> {campaign.owner}</div>
                </div>
               
            <div className="campaign-dates d-flex gap-2">
                <span className="start-date"> <strong>Start:</strong> {campaign.startDate}</span>
                <span className="end-date"> <strong>End:</strong>  {campaign.endDate}</span>
            </div>
            </div>
          
           
           
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
