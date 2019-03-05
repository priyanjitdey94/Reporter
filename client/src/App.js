import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Content from './components/Content';

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

    bodyVisual = userInfo ? <Content /> : <Login onUserAuth={this.onUserAuth} />;
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

  onUserAuth = (value) => {
    this.setState({
      userInfo: value
    });
  }
}

export default App;
