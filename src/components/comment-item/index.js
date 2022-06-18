import React from 'react';

export function CommentItem({ image, comment }) {
  return (
    <div className="comment-item">
      <div className="comment-photo-div">
        <img src={image} alt="Commenter profile" />
      </div>
      <div className="comment-text-div">
        <div className="comment-commenter"> {comment.username} </div>
        <div className="comment-content">{comment.content}</div>
      </div>
    </div>
  );
}

export default CommentItem;
