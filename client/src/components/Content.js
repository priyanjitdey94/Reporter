import React, { Component } from 'react';
import Papa from 'papaparse';
import Uploader from './Uploader';
import axios from 'axios';
import '../css/content.css'
import IssueManager from './IssueManager';
import Modal from './Modal';

export default class Content extends Component {
  constructor () {
    super();
    this.state = {
      csvFile: undefined,
      showList: undefined,
      modalInfo: undefined,
      data: undefined,  // raw data
      issues: undefined // copy of raw data, which is processed and used for creating issues
    }
  }
  render() {
    let { showList, csvFile, issues, modalInfo } = this.state,
      listComponent = '',
      modal;

    if (modalInfo) {
      modal = <Modal info={modalInfo} onClickHandler={this.onItemClick} />
    }
    if (showList) {
      listComponent = <IssueManager 
        showList={showList} 
        issues={issues} 
        userData={this.props.userData} 
        onItemClick={this.onItemClick} 
        onItemDelete={this.onItemDelete} 
        logIssue={this.logIssue} 
        setProjectInIssues={this.setProjectInIssues}/>
    }

    return (
      <div>
        <div className='content'>
          <Uploader csvFile={csvFile} updateCSVFile={this.updateCSVFile} processCSV={this.processCSV}/>
          {listComponent}
        </div>
        {modal}
      </div>
    );
  }

  onItemClick = (modalInfo) => {
    this.setState({
      modalInfo
    });
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
                  "key": issue.Project
              },
              "summary": issue.Title,
              "issuetype": {
                  "id": "10202"
              },
              "assignee": {
                  "name": issue['Assignee'].split(' ')[0].toLowerCase()
              },
              "reporter": {
                  "name": issue['Reporter'].split(' ')[0].toLowerCase()
              },
              "description": issue.Description
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

  setProjectInIssues = (project) => {
    let issues = [...this.state.issues];

    issues.map((issue) => {
      return issue['Project'] = project;
    });

    issues.map((issues) => {
      return issues['issueType'] = this.issueTypeFinder(project, issues['Type']);
    });

    this.setState({
      issues: issues
    });
  }

  issueTypeFinder = (projectKey, issueName) => {
    let projects = [...this.props.userData.projects], proj, id;
    projects.forEach((project) => {
      if(project.key === projectKey) {
        proj = project;
        project.issuetypes.forEach((issuetype) => {
          if(issueName === issuetype.name) {
            id = issuetype.id;
          }
        });
      }
    });
    return id || proj.issuetypes[0].id;
  }
}
