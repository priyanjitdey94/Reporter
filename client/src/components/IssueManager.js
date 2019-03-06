import React, { Component } from 'react'
import SideBar from './SideBar';
import ListManager from './ListManager';
import '../css/issuemanager.css';

export default class IssueManager extends Component {
  render() {
      let {showList, onItemClick, onItemDelete, issues, logIssue} = this.props;
    return (
      <div className='issue-manager'>
        <SideBar />
        <ListManager 
        showList= {showList}
        onItemClick= {onItemClick}
        onItemDelete={onItemDelete}
        logIssue = {logIssue}
        data={issues}
        />
      </div>
    )
  }
}
