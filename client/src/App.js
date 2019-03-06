import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Content from './components/Content';
import Modal from './components/Modal';

class App extends Component {
  constructor () {
    super();
    this.state = {
      userInfo: this.isSessionPresent(),
      ticketInfo: undefined
    };
  }
  render() {
    let { userInfo, ticketInfo } = this.state,
      bodyVisual,
      modal;

    // bodyVisual = userInfo ? <Content onItemClick={this.onItemClick} /> : <Login onUserAuth={this.onUserAuth} />;
    if (userInfo) {
      bodyVisual = <Content onItemClick={this.onItemClick} />;
      if (ticketInfo) {
        modal = <Modal info={this.state.ticketInfo} onClickHandler={this.onItemClick} />
      }
    } else {
      bodyVisual = <Login onUserAuth={this.onUserAuth} />;
    }
    return (
      <div className="App">
        <Header />
        {bodyVisual}
        {modal}
      </div>
    );
  }
  
  isSessionPresent = () => {
    return !!(localStorage.getItem('jiraReporterUser'));
  }

  onItemClick = (ticketInfo) => {
    this.setState({
      ticketInfo
    });
  }

  onUserAuth = (value) => {
    this.setState({
      userInfo: value
    });
  }
}

export default App;
