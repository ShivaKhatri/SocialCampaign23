import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
import CreatePost from "../CreatePost/CreatePost";
const Post = ({ post }) => {

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);
 

  const handleCommentButtonClick = () => {
    setShowCommentInput(true);
  };

  const handleCommentsToggle = () => {
    setShowComments((prev) => !prev);
  };

  const handleCloseButtonClick = () => {
    setShowCommentInput(false);
    setShowComments(false);
  };

  const renderMedia = () => {
    if (post.media) {
      if (post.media.type === 'image') {
        return <img className="w-100" src={post.media.src} alt="Post media" />;
      }
      if (post.media.type === 'video') {
        return (
          <video className="w-100" controls>
            <source src={post.media.src} type="video/mp4" />
          </video>
        );
      }
      if (post.media.type === 'audio') {
        return (
          <audio className="w-100" controls>
            <source src={post.media.src} type="audio/mpeg" />
          </audio>
        );
      }
    }
    return null;
  };

  return (
    <div>
      
    <div className="card mb-3">
      
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src="https://placehold.co/40x40/png"
            alt="User"
            className="rounded-circle me-3"
          />
          <div>
            <h6 className="mb-0">{post.author}</h6>
            <small className="text-muted">
              {post.date} | {post.location}
            </small>
          </div>
        </div>
        <p className="mt-3">{post.text}</p>
        {renderMedia()}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex gap-1">
            <button className="btn btn-sm btn-outline-secondary">
              <FontAwesomeIcon icon={faThumbsUp} /> Like ({post.likes})
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleCommentsToggle}
            >
              Comments ({post.comments.length})
            </button>
          </div>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleCommentButtonClick}
          >
            <FontAwesomeIcon icon={faCommentDots} /> Comment
          </button>
        </div>
        {(showCommentInput || showComments) && (
          <button
            className="btn btn-sm btn-outline-danger mt-3"
            onClick={handleCloseButtonClick}
          >
            <FontAwesomeIcon icon={faTimes} /> Close
          </button>
        )}
        {showCommentInput && (
          <div className="d-flex gap-1">
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Write your comment here..."
            />
            <button
              className="btn btn-sm btn-primary mt-3"
              onClick={handleCloseButtonClick}
            >
              Post
            </button>
          </div>
        )}
        {showComments && (
          <div className="mt-3">
            {post.comments.map((comment, index) => (
              <div key={index} className="comment d-flex flex-column mb-2">
                <span>
                  <strong>{comment.author}</strong>
                </span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Post;
