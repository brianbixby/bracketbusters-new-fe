import React, { useEffect, useState, lazy } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import {
  userProfileFetchRequest,
  groupProfilesFetchRequest,
} from '../../actions/userProfile-actions.js';
import {
  leaguesFetchRequest,
  leagueFetchRequest,
  leagueUpdateRequest,
  topPublicLeaguesFetchRequest,
  leagueFetch,
  leagueJoinRequest,
} from '../../actions/league-actions.js';
import {
  groupsFetchRequest,
  topPublicGroupsFetchRequest,
  groupFetch,
  groupJoinRequest,
} from '../../actions/group-actions.js';
import {
  scoreBoardsFetchRequest,
  topScoresFetchRequest,
} from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import {
  gamesFetchRequest,
  gameUpdateRequest,
} from '../../actions/game-actions.js';
import {
  userPicksFetchRequest,
  userPickUpdateRequest,
  userPickCreateRequest,
  userPickFetchRequest,
} from '../../actions/userPick-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import {
  messageBoardLeagueFetchRequest,
  messageBoardGroupFetchRequest,
} from '../../actions/messageBoard-actions.js';
const GameItem = lazy(() => import('../game-item'));
const UserPickItem = lazy(() => import('../user-pick-item'));
const MessageBoardContainer = lazy(() => import('../message-board-container'));
const Table = lazy(() => import('../helpers/table'));
const BannerAd = lazy(() => import('../helpers/bannerAd'));
import { userValidation, logError, renderIf } from '../../lib/util.js';
import nbalogo from './../helpers/assets/nba-logo.webp';
import basketball from './../helpers/assets/basketball.webp';
import kd from './../helpers/assets/2.webp';
import users from './../helpers/assets/icons/users.icon.svg';
import info from './../helpers/assets/icons/info.icon.svg';

function LeagueContainer(props) {
  const { leagueID } = useParams();
  let navigate = useNavigate();
  const [scoreBoardsShown, setScoreBoardsShown] = useState(10);

  useEffect(() => {
    userValidation(props, navigate)
      .then(() => {
        if (Object.entries(props.currentLeague).length === 0) {
          props
            .leagueFetch(leagueID)
            .then(league => props.messageBoardLeagueFetch(league._id))
            .then(mb => props.commentsFetch(mb.comments));
        }
      })
      .then(() => props.scoreBoardsFetch(leagueID))
      .then(() => props.userPicksFetch(leagueID))
      .then(picks => {
        let gameIDArr = [];
        gameIDArr.push(picks.map(userPick => userPick.gameID._id));
        props.gamesFetch(props.currentLeague.sportingEventID, gameIDArr);
      })
      .then(() => window.scrollTo(0, 0))
      .catch(err => logError(err));
  }, []);

  const formatDate = date => {
    let dateArr = new Date(date).toDateString().split(' ');
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };
  const onLeagueClick = league => {
    props.leagueFetchRequest(league);
    return props
      .messageBoardLeagueFetch(league._id)
      .then(messageBoard => props.commentsFetch(messageBoard.comments))
      .then(() => props.userPicksFetch(league._id))
      .then(() => navigate(`/league/${league._id}`))
      .catch(logError);
  };
  const onGroupClick = group => {
    props.groupFetchRequest(group);
    return props
      .groupProfilesFetch(group.users)
      .then(() => props.messageBoardGroupFetch(group._id))
      .then(messageBoard => props.commentsFetch(messageBoard.comments))
      .then(() => navigate(`/group/${group._id}`))
      .catch(logError);
  };
  const handleBoundTopPublicLeagueClick = league => {
    if (props.leagues.some(leagues => leagues._id === league._id)) {
      onLeagueClick(league);
    } else {
      return props
        .leagueJoin(league._id)
        .then(() => props.messageBoardLeagueFetch(league._id))
        .then(messageBoard => props.commentsFetch(messageBoard.comments))
        .then(() => navigate(`/league/${league._id}`))
        .catch(logError);
    }
  };
  const handleBoundTopPublicGroupClick = group => {
    if (props.groups.some(groups => groups._id === group._id)) {
      onGroupClick(group);
    } else {
      return props
        .groupProfilesFetch(group.users)
        .then(() => props.groupJoin(group._id))
        .then(() => props.messageBoardGroupFetch(group._id))
        .then(messageBoard => props.commentsFetch(messageBoard.comments))
        .then(() => navigate(`/group/${group._id}`))
        .catch(logError);
    }
  };
  //   const handleComplete = league => {
  //     return props.leagueUpdate(league)
  //       .then(() => navigate(`/league/${props.league._id}`))
  //       .catch(logError);
  //   };
  const handleUpdate = userPick => {
    return props.userPickUpdate(userPick).catch(console.error);
  };
  const handleCreate = userPick => {
    userPick.leagueID = props.currentLeague._id;
    return props
      .userPickCreate(userPick)
      .then(userPick => props.userPickFetch(userPick._id))
      .catch(console.error);
  };
  const handleShowAll = () => {
    scoreBoardsShown === 10
      ? setScoreBoardsShown(props.scoreBoards.length)
      : setScoreBoardsShown(10);
  };
  let currentLeague = props.currentLeague;
  // let scoreBoards = 'scores';
  let formTypeLeague = 'league';
  let formTypeGroup = 'group';
  let topScores = 'scores';
  let leaguePhoto = currentLeague.image ? (
    <img
      className="lazyload createImg"
      data-src={currentLeague.image}
      alt="current league"
    />
  ) : (
    <img
      className="lazyload createImg"
      data-src={kd}
      alt="league placeholder"
    />
  );
  let scores = props.scoreBoards.slice(0, scoreBoardsShown);

  return (
    <div className="leagueItem-page page-outer-div" id="top">
      <div className="grid-container">
        <BannerAd />
        <div className="row">
          <div className="col-md-8">
            <div className="createOuter">
              <div className="createOuterInner">
                <div className="outer">
                  <div className="outerLeft">
                    <img
                      className="lazyload"
                      data-src={nbalogo}
                      alt="NBA Logo"
                    />
                    <p className="headerText">NBA</p>
                  </div>
                  <div className="outerRight"></div>
                </div>
                <div className="createMain">
                  <div className="createMainWrapper">
                    <div className="createMainContent">
                      <div className="createMainBorder"></div>
                      <div>
                        <p className="createMainTitle">
                          {currentLeague.leagueName}
                        </p>
                        <p className="createMainSubtitle">
                          {currentLeague.motto}
                        </p>
                      </div>
                    </div>
                    <div className="createImgDiv">{leaguePhoto}</div>
                  </div>
                </div>
              </div>
              <div className="joinOuter">
                <div className="joinWrapper">
                  <div className="joinTextDiv">
                    <div>
                      <p className="joinTextTitle">League Info</p>
                      <p className="joinTextSubtitle">
                        Creator: {currentLeague.ownerName} <br></br>
                        Created: {formatDate(currentLeague.createdOn)} <br></br>
                        Privacy: {currentLeague.privacy} <br></br>
                        Size: {currentLeague.size}
                      </p>
                    </div>
                  </div>
                  <div className="joinImgDiv">
                    <img
                      className="lazyload info"
                      data-src={info}
                      alt="League info icon"
                    />
                  </div>
                </div>
              </div>
              {renderIf(
                props.games && props.games.length > 0,
                <div className="mtop8">
                  <div className="picksGamesHeader">Games</div>
                  <div className="container overflow boxShadow">
                    {props.games.map(game => (
                      <div key={game._id} className="gameItemOuter">
                        <GameItem game={game} onComplete={handleCreate} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {renderIf(
                props.userPicks && props.userPicks.length > 0,
                <div className=" mtop8">
                  <div className="picksGamesHeader">Picks</div>
                  <div className="container overflow boxShadow">
                    {props.userPicks.map((userPick, idx) => (
                      <div key={idx} className="maxHeight90 userPickItemOuter">
                        <UserPickItem
                          userPick={userPick}
                          onUpdate={handleUpdate}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="m16">
              <MessageBoardContainer
                mBoardId={props.currentMessageBoard._id}
                commentsArray={props.currentMessageBoard.comments}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="leagueBoardsContainer">
              <div className="leaguesContainerHeader">
                <img
                  className="lazyload leaguesBoardIcon"
                  data-src={basketball}
                  alt="Basketball icon"
                />
                <p className="leaguesBoardHeader">LEAGUES</p>
              </div>
              <div className="tablesContainer">
                <div className="container tableContainer leagueBoards">
                  <div>
                    <p className="tableHeadline">
                      {currentLeague.leagueName} SCOREBOARD
                    </p>
                    <div className="tableColumnDiv">
                      <p className="tableColumn columnUser"> USER NAME </p>
                      <p className="tableColumn columnScore"> SCORE </p>
                    </div>
                  </div>
                  {scores.map(score => {
                    return (
                      <div className="rowColors" key={score._id}>
                        <Table item={score} type={topScores} />
                      </div>
                    );
                  })}
                  <div className="spacerRow">
                    {renderIf(
                      props.scoreBoards.length > 10,
                      <p className="seeAll" onClick={handleShowAll}>
                        {' '}
                        See All
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="container tableContainer leagueBoards">
                    <div>
                      <p className="tableHeadline">FEATURED LEAGUES</p>
                      <div className="tableColumnDiv">
                        <p className="tableColumn columnName"> LEAGUE NAME </p>
                        <p className="tableColumn columnCreator"> CREATOR </p>
                        <p className="tableColumn columnSize"> SIZE </p>
                      </div>
                    </div>
                    {props.topPublicLeagues.map(topPublicLeague => {
                      let boundTopPublicLeagueClick =
                        handleBoundTopPublicLeagueClick.bind(
                          this,
                          topPublicLeague
                        );
                      return (
                        <div
                          className="rowColors cursor"
                          key={topPublicLeague._id}
                          onClick={boundTopPublicLeagueClick}
                        >
                          <Table item={topPublicLeague} type={formTypeLeague} />
                        </div>
                      );
                    })}
                    <div className="spacerRow"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="leagueBoardsContainer">
              <div className="leaguesContainerHeader">
                <img
                  className="lazyload users"
                  data-src={users}
                  alt="users icon"
                />
                <p className="leaguesBoardHeader">FEATURED GROUPS</p>
              </div>
              <div className="container tableContainer">
                <div>
                  <p className="tableHeadline hideMed">FEATURED GROUPS</p>
                  <div className="tableColumnDiv groupTableColumnDiv">
                    <p className="tableColumn columnName"> GROUP NAME </p>
                    <p className="tableColumn columnCreator"> CREATOR </p>
                    <p className="tableColumn columnSize"> SIZE </p>
                  </div>
                </div>
                {props.topPublicGroups.map(topPublicGroup => {
                  let boundTopPublicGroupClick =
                    handleBoundTopPublicGroupClick.bind(this, topPublicGroup);
                  return (
                    <div
                      className="rowColors cursor groupsTableContainer"
                      key={topPublicGroup._id}
                      onClick={boundTopPublicGroupClick}
                    >
                      <Table item={topPublicGroup} type={formTypeGroup} />
                    </div>
                  );
                })}
                <div className="spacerRow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentLeague: state.currentLeague,
  currentMessageBoard: state.currentMessageBoard,
  scoreBoards: state.scoreBoards,
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
  games: state.games,
  userPicks: state.userPicks,
  leagues: state.leagues,
  groups: state.groups,
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
  groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
  sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
  topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) =>
    dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
  topScoresFetch: sportingeventID =>
    dispatch(topScoresFetchRequest(sportingeventID)),
  topPublicGroupsFetch: groupsIDArr =>
    dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  leagueFetch: league => dispatch(leagueFetchRequest(league)),
  leagueUpdate: league => dispatch(leagueUpdateRequest(league)),
  scoreBoardsFetch: leagueID => dispatch(scoreBoardsFetchRequest(leagueID)),
  userPicksFetch: leagueID => dispatch(userPicksFetchRequest(leagueID)),
  userPickUpdate: userPick => dispatch(userPickUpdateRequest(userPick)),
  userPickCreate: userPick => dispatch(userPickCreateRequest(userPick)),
  userPickFetch: userPick => dispatch(userPickFetchRequest(userPick)),
  gamesFetch: (sportingEventID, gameIDArr) =>
    dispatch(gamesFetchRequest(sportingEventID, gameIDArr)),
  gameUpdate: game => dispatch(gameUpdateRequest(game)),
  leagueJoin: leagueID => dispatch(leagueJoinRequest(leagueID)),
  groupJoin: groupID => dispatch(groupJoinRequest(groupID)),
  messageBoardLeagueFetch: leagueID =>
    dispatch(messageBoardLeagueFetchRequest(leagueID)),
  messageBoardGroupFetch: groupID =>
    dispatch(messageBoardGroupFetchRequest(groupID)),
  commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
  groupProfilesFetch: profileIDs =>
    dispatch(groupProfilesFetchRequest(profileIDs)),
  leagueFetchRequest: league => dispatch(leagueFetch(league)),
  groupFetchRequest: group => dispatch(groupFetch(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);
