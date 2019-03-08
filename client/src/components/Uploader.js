import React, { Component } from 'react';
import '../css/uploader.css';
// import Input from '@material-ui/core/Input';

class Uploader extends Component {
  render () {
    let { csvFile, updateCSVFile, processCSV } = this.props;
    return (
      <div className='uploader'>
        <label htmlFor="upload-input" className="custom-file-upload">
        <input type='file'
          id='upload-input'
          accept='.csv'
          onChange={updateCSVFile}>
        </input>
        &#8681; Import File
      </label>
      <button className={csvFile ? 'btn' : 'hide'} id='upload-btn' onClick={processCSV}>Upload</button>
     </div>
    )
  }
}

export default Uploader;
