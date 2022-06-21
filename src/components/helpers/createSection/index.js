import React from 'react';

import JoinSection from './../joinSection';
import Slider from './../slider';
import { renderIf } from './../../../lib/util.js';
import createleague from './../assets/createleague.webp';
import creategroup from './../assets/creategroup.webp';
import nbalogo from './../assets/nba-logo.webp';
import users from './../assets/icons/users.icon.svg';

function CreateSection(props) {
  const redirect = () => props.handleRedirect(`/${props.formType}s`);

  return (
    <div>
      <div className="createOuterInner">
        {renderIf(
          props.formType === 'league',
          <div className="outer">
            <div className="outerLeft">
              <img src={nbalogo} alt="NBA logo" />
              <p className="headerText">2018 NBA PLAYOFFS </p>
            </div>
            <div className="outerRight">
              <p className="seeAll" onClick={redirect}>
                See All
              </p>
            </div>
          </div>
        )}
        {renderIf(
          props.formType === 'group',
          <div className="outer">
            <div className="outerLeft">
              <img className="users" src={users} alt="Users icon" />
              <p className="headerText">GROUPS </p>
            </div>
            <div className="outerRight">
              <p className="seeAll" onClick={redirect}>
                See All
              </p>
            </div>
          </div>
        )}
        <div className="createMain">
          <div className="createMainWrapper" onClick={props.handleCreate}>
            <div className="createMainContent">
              <div className="createMainBorder"></div>
              <div>
                <p className="createMainTitle">
                  {' '}
                  Create a {props.formType}, and bring your friends!{' '}
                </p>
                {renderIf(
                  props.formType === 'league',
                  <p className="createMainSubtitle">
                    You&#39;re the League Manager here. Set up a private or
                    public league and play with your family and friends!
                  </p>
                )}
                {renderIf(
                  props.formType === 'group',
                  <p className="createMainSubtitle">
                    You&#39;re the leader of the group. Set up a private or
                    public group to cheer on your favorite team with your family
                    and friends!
                  </p>
                )}
              </div>
            </div>
            <div className="createImgDiv">
              {renderIf(
                props.formType === 'league',
                <img
                  className="createImg"
                  src={createleague}
                  alt="Create league icon"
                />
              )}
              {renderIf(
                props.formType === 'group',
                <img
                  id="createGroupImg"
                  className="createImg"
                  src={creategroup}
                  alt="Create group icon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <JoinSection
        joinType={props.formType}
        handleRedirect={props.handleRedirect}
      />
      {renderIf(
        props.joinedItems.length > 0,
        <div className="container">
          <div className="sliderOuter">
            <div className="sliderOuterWrapper">
              {props.joinedItems.map((joinedItem, idx) => {
                let boundJoinedItemClick = props.handlejoinedItemClick.bind(
                  this,
                  joinedItem
                );
                return (
                  <div className="sliderInnerWrapper" key={idx}>
                    <div className="cardOuter" onClick={boundJoinedItemClick}>
                      <Slider
                        joinedItem={joinedItem}
                        formType={props.formType}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateSection;
