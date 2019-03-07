import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Content from './components/Content';

class App extends Component {
  constructor () {
    super();
    this.state = {
      userInfo: this.isSessionPresent(),
      userData: ''
    };
  }
  render() {
    let { userInfo, userData } = this.state,
      bodyVisual;

    if (userInfo) {
      bodyVisual = <Content userData={userData}/>;
    } else {
      bodyVisual = <Login onUserAuth={this.onUserAuth} handleUserData={this.handleUserData}/>;
    }
    return (
      <div className="App">
        <Header />
        {bodyVisual}
      </div>
    );
  }
  
  isSessionPresent = () => {
    return false;
    // return !!(localStorage.getItem('jiraReporterUser'));
  }

  onUserAuth = (value) => {
    this.setState({
      userInfo: value
    });
  }

  handleUserData = (value) => {
    console.log(value);
    this.setState({
      userData: value
    })
  }
}

export default App;
