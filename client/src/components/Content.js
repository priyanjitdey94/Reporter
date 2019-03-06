import React, { Component } from 'react';
import Papa from 'papaparse';
import ListManager from './ListManager';
import Uploader from './Uploader';
import axios from 'axios';
import '../css/content.css'

export default class Content extends Component {
  constructor () {
    super();
    this.state = {
      csvFile: undefined,
      showList: undefined,
      data: undefined,  // raw data
      issues: undefined // copy of raw data, which is processed and used for creating issues
    }
  }
  render() {
    let { showList, csvFile, issues } = this.state,
      listComponent = '';

    if (showList) {
      listComponent = <ListManager 
        onItemClick={this.props.onItemClick}
        onItemDelete={this.onItemDelete}
        data={issues}
      />
    }

    return (
      <div className='content'>
        <Uploader csvFile={csvFile} updateCSVFile={this.updateCSVFile} processCSV={this.processCSV}/>
        {listComponent}
        <div id='log-btn'>
          <button className={showList ? 'btn': 'hide'} onClick={ () => {this.logIssue(issues)}}>Log Issues</button>
        </div>
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
      data,
      issues: [...data]
    });
  }

  logIssue = issues => {
    let issueJSON= this.createJSON(issues),
    postData = Object.assign({}, {username: localStorage.getItem('jiraReporterUser'), password: localStorage.getItem('jiraReporterPassword')}, {issueJSON});
    axios({
      method: 'post',
      url: 'http://localhost:4000/jira',
      data: postData,
      }).then((response) => {
         console.log('POST', response);
      }).catch(function (err) {
        console.log(err);
      });
  }

  createJSON = issues => {
    let issueArray = issues.map((issue) => {
        let issueObject = {
          "fields": {
              "project": {
                  "key": "TEST"
              },
              "summary": issue.Title,
              "issuetype": {
                  "id": "10202"
              },
              "description": ''
          }
        }
      return issueObject;
    })
    return {issueUpdates: issueArray};
  }

  onItemDelete = (delIndex) => {
    let { issues } = this.state;
    
    this.setState({
      issues: issues.filter((issue, index) => index !== delIndex)
    });
  }
}
