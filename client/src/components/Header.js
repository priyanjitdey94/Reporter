import React, {Component} from 'react'
import '../css/header.css'
import { deleteCookie, AUTHCOOKIEKEY } from '../utils/utility';

class Header extends Component {
  render () {
    let {showLogout, onLogout} = this.props,
      logoutElem;

    if (showLogout) {
      logoutElem = (<div className='logout' onClick={() => {
        deleteCookie(AUTHCOOKIEKEY);
        onLogout();
      }}>
        <span>Log out</span>
      </div>);
    }
    return (
      <div className='header-container'>
        <div className="header">
          <p>JIRA Reporter</p>
        </div>
        {logoutElem}
      </div>
    )
  }
}

export default Header;

