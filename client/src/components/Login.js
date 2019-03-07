import React, { Component } from 'react';
import '../css/login.css';
import axios from 'axios';

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
      password = document.getElementById('password').value;

    axios({
    method: 'get',
    url: 'http://localhost:4000/jira',
    params: {
      username,
      password
    }
    }).then((response) => {
      this.props.handleUserData(response.data);

      if (response.statusText === 'OK'){
        this.props.onUserAuth(true);
      } else {
        this.props.onUserAuth(false);
      }
    }).catch(function (err) {
      console.log(err);
    });

    localStorage.setItem('jiraReporterUser', username);
    localStorage.setItem('jiraReporterPassword', password);
  }
}

export default Login;
