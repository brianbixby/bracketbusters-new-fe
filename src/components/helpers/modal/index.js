import React from 'react';

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={props.close}></div>
      <div className="modal-wrapper">
        <div className="modal-close" onClick={props.close}></div>
        <div className="modal-header">
          <h2 className="modal-heading">{props.heading}</h2>
        </div>
        <div className="modal-body">
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
