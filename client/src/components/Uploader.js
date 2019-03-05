import React, { Component } from 'react';
import Papa from 'papaparse';
import ListManager from './ListManager';

class Uploader extends Component {
  constructor () {
    super();
    this.state = {
      csvFile: undefined,
      showList: undefined,
      data: undefined
    }
  }
  
  render () {
    let { showList, data } = this.state,
      listComponent = '';

    if (showList) {
      listComponent = <ListManager data={data}/>
    }
    return (
      <div className='uploader'>
        <label>Select a file </label> 
        <input type='file'
          id='uploadInput'
          accept='.csv'
          onChange={this.handleChange}>
        </input>
        <button onClick={this.processCSV}>Upload</button>
        <br></br>
        {listComponent}
      </div>
    );
  }

  handleChange = event => {
    let csvFile = event.target && event.target.files && event.target.files[0];
    this.setState({
      csvFile
    });
  }
  processCSV = () => {
    const { csvFile } = this.state;
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: this.updateData,
        header: true
      });
    }
  }

  updateData = result => {
    var data = result.data;
    this.setState({
      showList: true,
      data
    });
  }
}

export default Uploader;
