import React, { Component } from 'react';
import Cryptr from 'cryptr';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Content from './components/Content';
import { CRYPTOPHRASE, getCookie, AUTHCOOKIEKEY, SERVER_PATH } from './utils/utility';
import './css/nProgress.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      userInfo: this.isSessionPresent(),
      userData: '',
      cryptrInstance: new Cryptr(CRYPTOPHRASE),
      rightCredential: ''
    };
  }
  render() {
    let { userInfo, userData, cryptrInstance } = this.state,
      bodyVisual;

    if (userInfo) {
      bodyVisual = <Content userInfo={userInfo} cryptrInstance={cryptrInstance} userData={userData}/>;
    } else {
      bodyVisual = <Login cryptrInstance={cryptrInstance} onUserAuth={this.onUserAuth} handleUserData={this.handleUserData} handleCredential={this.handleCredential} rightCredential={this.state.rightCredential}/>;
    }
    return (
      <div className="App">
        <Header showLogout={userInfo} onLogout={this.resetSession}/>
        {bodyVisual}
      </div>
    );
  }
  componentDidMount() {
    let {userInfo, cryptrInstance} = this.state;

    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      axios({
        method: 'get',
        url: SERVER_PATH + 'jira',
        params: {
          username: userInfo.name,
          password: cryptrInstance.decrypt(userInfo.pass)
        }
      }).then((response) => {
        this.handleUserData(response.data);
        this.onUserAuth(userInfo);
      });
    }
  }
  
  isSessionPresent = () => {
    return getCookie(AUTHCOOKIEKEY) || false;
  }

  resetSession = () => {
    this.setState({
      userInfo: false,
      userData: ''
    });
  }

  onUserAuth = (value) => {
    this.setState({
      userInfo: typeof value === 'string' ? JSON.parse(value) : value
    });
  }

  handleUserData = (value) => {
    this.setState({
      userData: value
    })
  }

  handleCredential = (value) => {
    this.setState({
      rightCredential: value
    })
  }
}

export default App;
