import React, { Component } from 'react';
import Uploader from './components/uploader';
import './App.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Uploader />
      </div>
    );
  }
}

export default App;
