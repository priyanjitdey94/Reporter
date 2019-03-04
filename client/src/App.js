import React, { Component } from 'react';
import Uploader from './components/uploader';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          JIRA Reporter
        </header>
        <Uploader />
      </div>
    );
  }
}

export default App;
