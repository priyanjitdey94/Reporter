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
      versionIdMap: {
        idToVersion: {},
        versionToId: {}
      },
      userNameMap: {
        nameToDisp: {},
        dispToName: {}
      },
      project: '',
      versions: '',
      users: ''
    }
  }
  render() {
    let { showList, csvFile, issues, modalInfo, modalIndex, project, issueIdMap, versions, users, versionIdMap, userNameMap } = this.state,
      listComponent = '',
      modal;

    if (modalInfo) {
      modal = <Modal 
        info={modalInfo} 
        index={modalIndex} 
        project={project} 
        issueIdMap={issueIdMap}
        versionIdMap={versionIdMap}
        userNameMap={userNameMap}
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
        versions={versions}
        users={users}
        bulkUpdate={this.bulkUpdate}
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

  updateNameMapping = (userNameMap) => {
    let {issues, data} = this.state;

    if (issues) {
      issues = issues.map((issue, index) => {
        if (issue.assignee) {
          issue.assignee = userNameMap.dispToName[issue.assignee] ||
            userNameMap.dispToName[data[index].assignee];
        }
        if (issue.reporter) {
          issue.reporter = userNameMap.dispToName[issue.reporter] ||
            userNameMap.dispToName[data[index].reporter];
        }
        if (issue.reviewer) {
          issue.reviewer = userNameMap.dispToName[issue.reviewer] ||
            userNameMap.dispToName[data[index].reviewer];
        }

        return issue;
      });
    }
    this.setState({
      issues,
      userNameMap
    });
  }
  updateVersionMapping = (versionIdMap) => {
    let {issues, data} = this.state;

    if (issues) {
      issues = issues.map((issue, index) => {
        if (issue.affectversions) {
          issue.affectversions = versionIdMap.versionToId[issue.affectversions] ||
            versionIdMap.versionToId[data[index].affectversions]
        }
  
        if (issue.fixversions) {
          issue.fixversions = versionIdMap.versionToId[issue.fixversions] ||
            versionIdMap.versionToId[data[index].fixversions]
        }
        return issue;
      });
    }
    this.setState({
      issues,
      versionIdMap
    }); 
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
      issues: data.map(datum => Object.assign({}, datum))
    });
  }

  logIssue = issues => {
    let issueJSON= this.createJSON(issues),
    postData = Object.assign({}, {username: localStorage.getItem('jiraReporterUser'), password: localStorage.getItem('jiraReporterPassword')}, {issueJSON});
    console.log(issueJSON);
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
              // "assignee": {
              //   "name": issue.assignee
              // },
              // "reporter": {
              //   "name": issue.reporter
              // },
              // "fixVersions": [
              //   {
              //     "id": issue.fixversion || ''
              //   }
              // ],
              "description": issue.description
          }
        };
      
      issue.assignee && (issueObject.fields.assignee = {
        name: issue.assignee
      });
      issue.reporter && (issueObject.fields.reporter = {
        name: issue.reporter
      });
      issue.fixVersions && (issueObject.fields.assignee = [{
        id: issue.fixVersions
      }]);
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
      {issueIdMap, data, versionIdMap, userNameMap} = this.state,
      project = userData.projects.find(project => project.key === projKey),
      issuetypes = project.issuetypes;

    issueIdMap = {
      idToIssue: {},
      issueToId: {}
    };

    versionIdMap = {
      idToVersion: {},
      versionToId: {}
    }
    userNameMap = {
      nameToDisp: {},
      dispToName: {}
    }

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

      response.data.forEach(version => {
        versionIdMap.versionToId[version.name] = version.id;
        versionIdMap.idToVersion[version.id] = version.name;
      });

      this.updateVersionMapping(versionIdMap);

    }).catch(function (err) {
      console.log(err);
    });

    axios({
      method: 'get',
      url: 'http://localhost:4000/jira/users',
      params: {
        username: localStorage.getItem('jiraReporterUser'),
        password: localStorage.getItem('jiraReporterPassword'),
        projKey
      },
    }).then((response) => {
      this.setState({
        users: response.data
      });

      response.data.forEach(user => {
        userNameMap.nameToDisp[user.name] = user.displayName;
        userNameMap.dispToName[user.displayName] = user.name;
      });

      this.updateNameMapping(userNameMap);

    }).catch(function (err) {
      console.log(err);
    });


  }

  bulkUpdate = (key, value) => {
    let issues = [...this.state.issues];
    issues.forEach((issue) => {
      issue[key] = value;
    });
    this.setState({issues});
  }
}
