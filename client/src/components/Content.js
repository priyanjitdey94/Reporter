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
      project: '',
      versions: ''
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
        setProjectInIssues={this.setProjectInIssues}
        project={project}
        />
    }

    return (
        <div className='content'>
          <Uploader csvFile={csvFile} updateCSVFile={this.updateCSVFile} processCSV={this.processCSV}/>
          {listComponent}
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
    debugger
    data = data.map(datum => cleanse(datum));
    this.setState({
      showList: true,
      data,
      issues: data.map(datum => Object.assign({}, datum))
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
                  "key": issue.project
              },
              "summary": issue.summary,
              "issuetype": {
                  "id": issue.issuetype
              },
              "assignee": {
                  "name": issue['assignee'].split(' ')[0].toLowerCase()
              },
              "reporter": {
                  "name": issue['reporter'].split(' ')[0].toLowerCase()
              },
              "description": issue.description
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
      {issueIdMap, data} = this.state,
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
    issues = issues.map((issue, index) => {
      issue.project = projKey;
      issue.issuetype = issueIdMap.issueToId[issue.issuetype] || issueIdMap.issueToId[data[index].issuetype];
      return issue;
    });

    this.setState({
      project,
      issueIdMap,
      issues
    });
    axios({
      method: 'get',
      url: 'http://localhost:4000/jira/versions',
      params: {
        username: localStorage.getItem('jiraReporterUser'),
        password: localStorage.getItem('jiraReporterPassword'),
        projKey
      },
    }).then((response) => {
      this.setState({
        versions: response.data
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
}
