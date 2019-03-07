import React, { Component } from 'react'
import SideBar from './SideBar';
import ListManager from './ListManager';
import '../css/issuemanager.css';

export default class IssueManager extends Component {
  render() {
      let {showList, onItemClick, onItemDelete, issues, logIssue, userData, setProjectInIssues, project} = this.props;
    return (
      <div className='issue-manager'>
        <SideBar userData={userData} setProjectInIssues={setProjectInIssues}/>
        <ListManager 
        showList= {showList}
        onItemClick= {onItemClick}
        onItemDelete={onItemDelete}
        logIssue = {logIssue}
        data={issues}
        project={project}
        />
      </div>
    )
  }
}
