import React, { Component } from 'react';
import Uploader from './components/uploader';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';

class App extends Component {
  constructor () {
    super();
    this.state = {
      userInfo: this.isSessionPresent()
    };
  }
  render() {
    let { userInfo } = this.state,
      bodyVisual;

    bodyVisual = userInfo ? <Uploader /> : <Login onUserAuth={this.onUserAuth} />;
    return (
      <div className="App">
        <Header />
        {bodyVisual}
      </div>
    );
  }
  
  isSessionPresent = () => {
    return !!(localStorage.getItem('jiraReporterUser'));
  }

  onUserAuth = () => {
    this.setState({
      userInfo: true
    });
  }
}

export default App;
