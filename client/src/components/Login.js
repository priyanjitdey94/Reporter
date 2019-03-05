import React, { Component } from 'react';
import '../css/login.css';
// import cryptojs from 'crypto-js';

class Login extends Component {
  render () {
    return (
      <div className='login-form'>
        <div className='form-row'> 
          <label> User name: </label>
          <input type='text' id='username'></input>
        </div>
        <div className='form-row'>
          <label> Password: </label>
          <input type='password' id='password'></input>
        </div>
        <button onClick={this.authorizeLogin}>Login</button>
      </div>
    );
  }

  authorizeLogin = () => {
    let username = document.getElementById('username').value,
      password = document.getElementById('password').value;

    localStorage.setItem('jiraReporterUser', username);
    localStorage.setItem('jiraReporterPassword', password);
    this.props.onUserAuth && this.props.onUserAuth();
  }
}

export default Login;
