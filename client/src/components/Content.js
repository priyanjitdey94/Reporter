import React, { Component } from 'react';
import Papa from 'papaparse';
import Uploader from './Uploader';
import axios from 'axios';
import '../css/content.css'
import IssueManager from './IssueManager';

export default class Content extends Component {
  constructor () {
    super();
    this.state = {
      csvFile: undefined,
      showList: undefined,
      data: undefined,  // raw data
      issues: undefined, // copy of raw data, which is processed and used for creating issues
      project: ''
    }
  }
  render() {
    let { showList, csvFile, issues } = this.state,
      listComponent = '';

    if (showList) {
      listComponent = 
      <IssueManager showList={showList} issues={issues} userData={this.props.userData} onItemClick={this.props.onItemClick} onItemDelete={this.onItemDelete} logIssue={this.logIssue} setProjectInIssues={this.setProjectInIssues}/>
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
      data,
      issues: [...data]
    });
  }

  logIssue = issues => {
    let issueJSON= this.createJSON(issues),
    postData = Object.assign({}, {username: localStorage.getItem('jiraReporterUser'), password: localStorage.getItem('jiraReporterPassword')}, {issueJSON});
    console.log(JSON.stringify(issueJSON, null, 4));
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
                  "id": issue.issueType
              },
              "assignee": {
                  "name": issue['Assignee'].split(' ')[0].toLowerCase()
              },
              // "reporter": {
              //     "name": issue['Reporter'].split(' ')[0].toLowerCase()
              // },
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

  setProjectInIssues = (projKey) => {
    let issues = [...this.state.issues];

    issues.map((issue) => {
      return issue['Project'] = projKey;
    });

    issues.map((issues) => {
      return issues['issueType'] = this.issueTypeFinder(projKey, issues['Type']);
    });

    this.props.userData.projects.forEach((project) => {
      if (project.key === projKey) {
        this.setState({
          project
        })
      }
    })
    this.setState({
      issues
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
