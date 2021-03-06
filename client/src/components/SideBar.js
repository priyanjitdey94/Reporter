import React, { Component } from 'react';
import '../css/sidebar.css';
import Select from 'react-select';
import Switch from '@material-ui/core/Switch';
import { priorityOptions } from '../utils/utility';

export default class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  render() {
    let projects = [ ...this.props.userData.projects ],
    projectOptions = projects.map((project) => {
      return {value: project.key, label: project.name}
    })
    return (
      <div className={this.props.project ? 'side-bar' : 'side-bar-full'}>
        <div className={this.props.project ? 'project-selector' : 'project-selector-full'}>
        <label className='sidebar-label'>Select Project</label>
        <Select isSearchable={true} options={projectOptions} onChange={(e) => {this.handleProjectChange(e.value)}}/>
        </div>
        <div className={this.props.project ? 'key-selector' : 'hide'}>
        <label className='sidebar-label'>Select Key</label>
        <Select isSearchable={true} options={[{value: 'issuetype', label: 'Issue Type'}, {value: 'fixversions', label: 'Fix Versions'}, {value: 'affectversions', label: 'Affect Versions'}, {value: 'priority', label: 'Priority'}, {value: 'assignee', label: 'Assignee'}]} onChange={(e) => {this.handleKeyChange(e.value)}}/>
        </div>
        <div className={this.props.project ? 'value-selector' : 'hide'}>
        <label className='sidebar-label'>Select Value</label>
        <Select isSearchable={true} options={this.getValueOptions()} onChange={(e) => {this.handleValueChange(e.value)}}/>
        </div>
        <div className={this.props.loggedIssues.length ? 'issue-logger-switch' : 'hide'}>
        <label className='issue-logger-label'>{this.props.showIssueLogger ? 'Hide Logger' : 'Show Logger'}</label>
          <Switch checked={this.props.showIssueLogger} onChange={() => {this.handleLoggerDisplay()}} value="showIssueLogger" color="primary"/>
        </div>
      </div>
    )
  }
  handleProjectChange = (project) => {
    this.props.setProjectInIssues(project);
  }
  handleKeyChange = (value) => {
    this.setState({
      value
    });
  }
  getValueOptions = () => {
    let value = this.state.value, vArray, options = [];
    if (value === 'fixversions' || value === 'affectversions') {
      vArray = this.props.versions;
      options = vArray.map(version => {
        return {value: version.id, label: version.name}
      });
    } else if (value === 'issuetype') {
      vArray = this.props.project.issuetypes;
      options = vArray.map(issue => {
        return {value: issue.id, label: issue.name}
      });
    } else if (value === 'assignee') {
      vArray = this.props.users;
      options = vArray.map(user => {
        return {value: user.name, label: user.displayName}
      });
    } else if (value === 'priority') {
      vArray = Object.keys(priorityOptions.priorityIdMap);
      options = vArray.map(priority => {
        return {value: priorityOptions.priorityIdMap[priority], label: priority}
      });
    }
    return options;
  }
  handleValueChange = (value) => {
    this.props.bulkUpdate(this.state.value, value);
  }
  handleLoggerDisplay = () => {
    this.props.handleLoggerDisplay(!this.props.showIssueLogger)
  }
}
