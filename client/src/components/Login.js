import React, { Component } from 'react';
import '../css/login.css';
import axios from 'axios';
import { writeCookie, AUTHCOOKIEKEY, getCookie, SERVER_PATH } from '../utils/utility';
import nProgress from 'nprogress';
class Login extends Component {
  render () {
    return (
      <div className='login-form'>
      <div className={(this.props.rightCredential || (this.props.rightCredential === ''))  ? 'hide' : 'login-error-message'}>Wrong Username/Password</div>
      <form onSubmit={(e)=> {e.preventDefault(); this.authorizeLogin()}} >
        <div className='form-row'>
          <input type='text' id='username' placeholder="Username"></input>
        </div>
        <div className='form-row'>
          <input type='password' id='password' placeholder="Password"></input>
        </div>
        <button className='btn' id='log-in-btn'>Login</button>
      </form>
      </div>
    );
  }

  authorizeLogin () {
    let username = document.getElementById('username').value,
      password = document.getElementById('password').value,
      {cryptrInstance} = this.props,
      enc;

    nProgress.start();
    nProgress.inc(0.4);
    axios({
    method: 'get',
    url: SERVER_PATH + 'jira',
    params: {
      username,
      password
    }
    }).then((response) => {
      this.props.handleUserData(response.data);

      enc = cryptrInstance.encrypt(password);
      if (response.data){
        writeCookie(AUTHCOOKIEKEY, username, enc, 1000 * 60 * 60 * 6);
        this.props.handleCredential(true);
        this.props.onUserAuth(getCookie(AUTHCOOKIEKEY));
      } else {
        this.props.handleCredential(false);
        this.props.onUserAuth(false);
      }
      nProgress.done();
    });
  }
}

export default Login;
