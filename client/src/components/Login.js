import React, { Component } from 'react';
import '../css/login.css';
import axios from 'axios';
import { writeCookie, AUTHCOOKIEKEY, getCookie } from '../utils/utility';

class Login extends Component {
  render () {
    return (
      <div className='login-form'>
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

    axios({
    method: 'get',
    url: 'https://jira-reporter-proxy-server.herokuapp.com/jira',
    params: {
      username,
      password
    }
    }).then((response) => {
      this.props.handleUserData(response.data);

      enc = cryptrInstance.encrypt(password);
      writeCookie(AUTHCOOKIEKEY, username, enc, 1000 * 60 * 60 * 6);
      if (response.statusText === 'OK'){
        this.props.onUserAuth(getCookie(AUTHCOOKIEKEY));
      } else {
        this.props.onUserAuth(false);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }
}

export default Login;
