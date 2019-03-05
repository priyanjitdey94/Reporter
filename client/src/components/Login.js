import React, { Component } from 'react';
import '../css/login.css';
import axios from 'axios';
// import JiraConnector from 'jira-connector';
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
    
    // var jira = new JiraConnector( {
    //   host: 'fusioncharts.jira.com',
    //   basic_auth: {
    //       username: 'SirUserOfName',
    //       password: 'Password123'
    //   }
    // });
    // console.log(jira.user.getUser({
    //   username,
    //   password
    // }));
    axios({
      method: 'get',
      url: 'https://fusioncharts.jira.com/rest/api/2/issue/createmeta',
      auth: {
        username,
        password
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': 86400,
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        'Access-Control-Expose-Headers': 'Access-Token, Uid'
      }
    }).then(function (response) {
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    });
    // localStorage.setItem('jiraReporterUser', username);
    // localStorage.setItem('jiraReporterPassword', password);
    // this.props.onUserAuth && this.props.onUserAuth();
  }
}

export default Login;
