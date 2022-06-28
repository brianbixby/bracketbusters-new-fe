import React, { useState, useLayoutEffect } from 'react';

import { renderIf } from '../../lib/util';

function CommentForm(props) {
  const [content, setContent] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState(37);
  const textAreaHeightRef = React.createRef();

  useLayoutEffect(() => {
    return () => {
      setContent('');
      setTextAreaHeight(37);
    };
  }, []);

  const handleChange = e => {
    let currHeight = textAreaHeightRef.current.scrollHeight;
    if (currHeight > textAreaHeight) {
      setTextAreaHeight(currHeight);
    }
    setContent(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (content) {
      props.onComplete({ content });
    }
    setContent('');
    setTextAreaHeight(37);
  };

  let textAreaStyle = { height: `${textAreaHeight}px` };
  return (
    <form onSubmit={handleSubmit} className="form comment-form">
      <div className="photo-div">
        <img className="lazyload" data-src={props.image} alt="Comment Icon" />
      </div>
      <div className="commentInput-div">
        <div className="commentInputWrapper">
          <textarea
            className="commentInput"
            type="content"
            name="content"
            placeholder="add a comment..."
            value={content}
            onChange={handleChange}
            ref={textAreaHeightRef}
            style={textAreaStyle}
          ></textarea>
        </div>
      </div>
      {renderIf(
        content,
        <div className="commentFormButtonDiv">
          <div className="ButtonDiv">
            <button className="button" type="submit">
              {' '}
              post{' '}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default CommentForm;
