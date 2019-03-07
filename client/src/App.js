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
      ticketInfo: undefined,
      userData: ''
    };
  }
  render() {
    let { userInfo, ticketInfo, userData } = this.state,
      bodyVisual,
      modal;

    if (userInfo) {
    bodyVisual = <Content onItemClick={this.onItemClick} userData={userData}/>;
      if (ticketInfo) {
        modal = <Modal info={this.state.ticketInfo} onClickHandler={this.onItemClick} />
      }
    } else {
      bodyVisual = <Login onUserAuth={this.onUserAuth} handleUserData={this.handleUserData}/>;
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
    // return !!(localStorage.getItem('jiraReporterUser'));
    return false;
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

  handleUserData = (value) => {
    this.setState({
      userData: value
    })
  }
}

export default App;
