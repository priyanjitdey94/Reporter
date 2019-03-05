import React, { Component } from 'react';
import '../css/uploader.css';

class Uploader extends Component {
  render () {
    let { csvFile, updateCSVFile, processCSV } = this.props;
    return (
      <div className='uploader'>
        <label>Select a file </label>
        <input type='file'
          id='upload-input'
          accept='.csv'
          onChange={updateCSVFile}>
        </input>
        <button className={csvFile ? '' : 'hide'}onClick={processCSV}>Upload</button>
     </div>
    )
  }
}

export default Uploader;
