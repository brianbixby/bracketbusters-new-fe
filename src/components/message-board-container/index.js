import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../comment-form';
import CommentItem from '../comment-item';
import {
  commentCreateRequest,
  commentFetchRequest,
  commentsFetchRequest,
} from '../../actions/comment-actions.js';
import Modal from '../helpers/modal';
import { logError, renderIf } from './../../lib/util.js';
import placeholderImage from './../helpers/assets/profilePlaceholder.webp';
import commentsIcon from './../helpers/assets/icons/comments.icon.svg';

function MessageBoardContainer(props) {
  const [launchCommentModal, setLaunchCommentModal] = useState(false);

  useEffect(() => {
    if (props.commentsArray) {
      props.commentsFetch(props.commentsArray).catch(err => logError(err));
    }
  }, []);

  useLayoutEffect(() => {
    return () => {
      setLaunchCommentModal(false);
    };
  }, []);

  const handleComplete = comment => {
    if (props.userProfile.image) {
      comment.image = props.userProfile.image;
    }
    comment.messageBoardID = props.mBoardId;
    props.commentCreate(comment).catch(err => logError(err));
  };
  let comments = props.comments.slice(0, 5);
  let profileImage =
    props.userProfile && props.userProfile.image
      ? props.userProfile.image
      : placeholderImage;

  return (
    <div className="wideSectionWrapper messageBoardOuter">
      <div className="outer messageboardHeader">
        <div className="outerLeft">
          <img className="comments" src={commentsIcon} alt="comments icon" />
          <p className="headerText">MESSAGE BOARD </p>
        </div>
        <div className="outerRight">
          <p className="seeAll" onClick={() => setLaunchCommentModal(true)}>
            See All
          </p>
        </div>
      </div>
      <div className="messageBoard-container">
        <div className="messageBoard-wrapper">
          <CommentForm onComplete={handleComplete} image={profileImage} />
        </div>
        {comments.map(comment => (
          <div key={comment._id} className="comentOuterDiv">
            <CommentItem comment={comment} image={profileImage} />
          </div>
        ))}
      </div>
      <div className="messageBoardModalContainer">
        {renderIf(
          launchCommentModal,
          <Modal
            heading="MESSAGE BOARD"
            close={() => setLaunchCommentModal(false)}
          >
            <div>
              <div className="messageBoard-wrapper">
                <CommentForm onComplete={handleComplete} image={profileImage} />
              </div>
              {props.comments.map(comment => (
                <div key={comment._id} className="comentOuterDiv">
                  <CommentItem comment={comment} image={profileImage} />
                </div>
              ))}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentMessageBoard: state.currentMessageBoard,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => ({
  commentCreate: comment => dispatch(commentCreateRequest(comment)),
  commentFetch: commentID => dispatch(commentFetchRequest(commentID)),
  commentsFetch: comments => dispatch(commentsFetchRequest(comments)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBoardContainer);
