import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import Avatar from '../helpers/avatar';
import { signOut } from '../../actions/userAuth-actions.js';
import { classToggler, renderIf } from '../../lib/util.js';
import user from './../helpers/assets/icons/user.icon.svg';
import caretDown from './../helpers/assets/icons/caret-down.icon.svg';
import github from './../helpers/assets/icons/github.icon.svg';
import linkedin from './../helpers/assets/icons/linkedin.icon.svg';


function Navbar(props) {
    let navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [intro, setIntro] = useState(false);

    useEffect(() => {
        tokenCheck();
    }, [])

  const tokenCheck = () => {
    if(!props.userAuth) {
      let token = localStorage.token;  
      if(!token) setIntro(true)
    }
    else {
        setIntro(false);
    }
  };
  const handleSignOut = () => {
    props.signOut();
    navigate('/');
  };
    let profileImage = props.userProfile && props.userProfile.image ? <Avatar url={props.userProfile.image} /> : <img className='noProfileImageNav' src={user} alt="user" />;
    let profileLink = props.userProfile && props.userProfile._id ? `/user/${props.userProfile._id}` : '';
    return (
      <header className={classToggler({
        'navbar': true,
        'introNavbar': !props.userAuth,
      })}>
        <nav>
          <div className='logo'>
              <Link to='/' className={classToggler({ 'link': true, 'logo-text': true, 'intro-text': !props.userAuth })}><span className='bracket'>BRACKET</span><span className='light'>BUSTERS</span></Link>
          </div>
          <ul className='socials'>
            <li className='social dropdown'>
              {renderIf(props.userAuth,
                <div>
                  <div className='avatarDiv' onClick={() => setVisible(!visible)} >
                    <img className='caretDown' src={caretDown} alt="caret down"/>
                    {profileImage}
                  </div>
                  <div className={visible ? 'slideIn dropdownDiv' : 'slideOut dropdownDiv' }>
                    <Link to={profileLink} className='link' onClick={() => setVisible(!visible)}>profile</Link>
                    <Link to='/leagues' className='link' onClick={() => setVisible(!visible)}>leagues</Link>
                    <Link to='/groups' className='link' onClick={() => setVisible(!visible)}>groups</Link>
                    <p className='logout link' onClick={handleSignOut}>logout</p>
                  </div>
                </div>
              )}
            </li>
            <li className='social'>
              <a href="https://github.com/brianbixby" rel="noopener noreferrer" target="_blank"><span><img className='github' src={github} alt="github icon"/></span> </a>
            </li>
            <li className='social'>
              <a href="https://www.linkedin.com/in/brianbixby1/" rel="noopener noreferrer" target="_blank"><span><img className='linkedin' src={linkedin} alt="linkedin icon" /></span></a>
            </li>
          </ul>
        </nav>
    </header>
    );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);