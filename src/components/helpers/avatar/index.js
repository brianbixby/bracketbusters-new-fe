import React from 'react';

const Avatar = props => (
  <div className="avatar">
    <img data-src={props.url} alt="lazyload user avatar" />
  </div>
);

export default Avatar;
