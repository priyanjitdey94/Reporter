import React, { Component } from 'react';
import '../css/uploader.css';
// import Input from '@material-ui/core/Input';

class Uploader extends Component {
  render () {
    let { csvFile, updateCSVFile, processCSV } = this.props;
    return (
      <div className='uploader'>
        <input type='file'
          id='upload-input'
          accept='.csv'
          onChange={updateCSVFile}>
        </input>
        <br></br>
        <button className={csvFile ? 'btn' : 'hide'}onClick={processCSV}>Upload</button>
     </div>
    )
  }
}

export default Uploader;
