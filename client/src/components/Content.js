import React, { Component } from 'react';
import Papa from 'papaparse';
import ListManager from './ListManager';
import Uploader from './Uploader';

export default class Content extends Component {
  constructor () {
    super();
    this.state = {
      csvFile: undefined,
      showList: undefined,
      data: undefined
    }
  }
  render() {
    let { showList, data, csvFile } = this.state,
      listComponent = '';

    if (showList) {
      listComponent = <ListManager data={data}/>
    }

    return (
      <div className='content'>
        <Uploader csvFile={csvFile} updateCSVFile={this.updateCSVFile} processCSV={this.processCSV}/>
        {listComponent}
      </div>
    );
  }

  updateCSVFile = event => {
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
