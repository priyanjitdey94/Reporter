import React, { Component } from 'react';
import Papa from 'papaparse';
import Uploader from './Uploader';
import axios from 'axios';
import '../css/content.css'
import IssueManager from './IssueManager';
import Modal from './Modal';
import { cleanse } from '../utils/utility';

export default class Content extends Component {
  constructor () {
    super();
    this.state = {
      csvFile: '',
      showList: '',
      modalInfo: '',
      modalIndex: '',
      data: '',  // raw data
      issues: '', // copy of raw data, which is processed and used for creating issues
      issueIdMap: {
        idToIssue: {},
        issueToId: {}
      },
      project: ''
    }
  }
  render() {
    let { showList, csvFile, issues, modalInfo, modalIndex, project, issueIdMap } = this.state,
      listComponent = '',
      modal;

    if (modalInfo) {
      modal = <Modal 
        info={modalInfo} 
        index={modalIndex} 
        project={project} 
        issueIdMap={issueIdMap}
        onClickHandler={this.onItemClick} 
        onApply={this.updateIssueInfoFromModal}/>
    }
    if (showList) {
      listComponent = <IssueManager 
        showList={showList} 
        issues={issues} 
        issueIdMap={issueIdMap}
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

  onItemClick = (modalInfo, modalIndex) => {
    this.setState({
      modalInfo,
      modalIndex
    });
  }

  updateIssueInfoFromModal = (info, index) => {
    let {issues} = this.state;

    issues[index] = info;
    this.setState({
      issues
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
    data = data.map(datum => cleanse(datum));
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
    let issues = [...this.state.issues],
      {userData} = this.props,
      {issueIdMap} = this.state,
      project = userData.projects.find(project => project.key === projKey),
      issuetypes = project.issuetypes;

    issueIdMap = {
      idToIssue: {},
      issueToId: {}
    };
    issuetypes.forEach(issuetype => {
      issueIdMap.issueToId[issuetype.name] = issuetype.id;
      issueIdMap.idToIssue[issuetype.id] = issuetype.name;
    });
    issues = issues.map((issue) => {
      issue.project = projKey;
      issue.issuetype = issueIdMap.issueToId[issue.issuetype] || issue.issuetype;
      return issue;
    });

    this.setState({
      issues,
      project,
      issueIdMap
    });
  }
}
