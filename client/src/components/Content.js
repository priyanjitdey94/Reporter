import React, { Component } from 'react';
import Papa from 'papaparse';
import Uploader from './Uploader';
import axios from 'axios';
import '../css/content.css'
import IssueManager from './IssueManager';
import Modal from './Modal';
import { cleanse, priorityOptions, SERVER_PATH } from '../utils/utility';
import IssueLogger from './IssueLogger';
import nProgress from 'nprogress';

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
      users: '',
      loggedIssues: [],
      showIssueLogger: ''
    }
  }
  render() {
    let { showList, csvFile, issues, modalInfo, modalIndex, project, issueIdMap, versions, users, versionIdMap, userNameMap, showIssueLogger, loggedIssues } = this.state,
      listComponent = '',
      modal,
      issueLogger;

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
        showIssueLogger={showIssueLogger}
        handleLoggerDisplay={this.handleLoggerDisplay}
        loggedIssues={loggedIssues}
        />
    }
    if (showIssueLogger) {
      issueLogger = <IssueLogger
        showIssueLogger={showIssueLogger}
        issues={loggedIssues}
        handleLoggerDisplay={this.handleLoggerDisplay}
      />
    }

    return (
        <div className='content'>
          <Uploader csvFile={csvFile} updateCSVFile={this.updateCSVFile} processCSV={this.processCSV}/>
          {listComponent}
          {modal}
          {issueLogger}
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

    if (this.state.project) {
      this.setProjectInIssues(this.state.project.key);
    }
  }

  logIssue = issues => {
    let issueJSON= this.createJSON(issues),
      {userInfo, cryptrInstance} = this.props,
      postData = Object.assign({}, {username: userInfo.name, password: cryptrInstance.decrypt(userInfo.pass)}, {issueJSON});
      
      nProgress.start();
      nProgress.inc(0.4);
    
    axios({
      method: 'post',
      url: SERVER_PATH + 'jira',
      data: postData,
      }).then((response) => {
         this.setState({
           loggedIssues: [...this.state.loggedIssues, ...response.data.issues],
           showIssueLogger: true
        });

         nProgress.done();
      }).catch(function (err) {
          console.log(err);
          nProgress.done();
      });
  }

  createJSON = issues => {
    let issueArray = issues.map((issue) => {
        let issueObject = {
          "fields": {
              "project": {
                "key": issue.project
              },
              "summary": issue.summary || '',
              "issuetype": {
                "id": issue.issuetype || this.state.issueIdMap.issueToId.Bug
              },
              "description": (issue.description || '') + '{code}'+ JSON.stringify(JSON.parse(issue.testdata), null, 4) +'{code}'
          }
        };
      
      issue.assignee && (issueObject.fields.assignee = {
        name: issue.assignee
      });
      issue.fixversions && (issueObject.fields.fixVersions = [{
        id: issue.fixversions
      }]);
      issue.affectversions && (issueObject.fields.versions = [{
        id: issue.affectversions
      }]);
      issue.priority && (issueObject.fields.priority = {
        id: issue.priority
      });
      return issueObject;
    });
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
      {userData, userInfo, cryptrInstance} = this.props,
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
      issue.priority = priorityOptions.priorityIdMap[issue.priority] || priorityOptions.priorityIdMap[data[index].priority]
      return issue;
    });

    this.setState({
      project,
      issueIdMap,
      issues
    });

    axios({
      method: 'get',
      url: SERVER_PATH + 'jira/versions',
      params: {
        username: userInfo.name,
        password: cryptrInstance.decrypt(userInfo.pass),
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
      url: SERVER_PATH + 'jira/users',
      params: {
        username: userInfo.name,
        password: cryptrInstance.decrypt(userInfo.pass),
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

  handleLoggerDisplay = (value) => {
    this.setState({
      showIssueLogger: value
    });
  }
}
