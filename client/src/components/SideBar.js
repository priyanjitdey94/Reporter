import React, { Component } from 'react';
import '../css/sidebar.css';
import Select from 'react-select';

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
        <Select isSearchable={true} options={[{value: 'issuetype', label: 'Issue Type'}, {value: 'fixversion', label: 'Fix Version'}, {value: 'affectversion', label: 'Affect Version'}, {value: 'priority', label: 'Priority'}, {value: 'assignee', label: 'Assignee'}]} onChange={(e) => {this.handleKeyChange(e.value)}}/>
        </div>
        <div className={this.props.project ? 'value-selector' : 'hide'}>
        <label className='sidebar-label'>Select Value</label>
        <Select isSearchable={true} options={this.getValueOptions()} onChange={(e) => {this.handleValueChange(e.value)}}/>
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
    if (value === 'fixversion' || value === 'affectversion') {
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
      vArray = [{name: 'Blocker', id: 1}, {name: 'Critical', id: 1}, {name: 'Major', id: 1}, {name: 'Minor', id: 1}, {name: 'Trivial', id: 1}];
      options = vArray.map(user => {
        return {value: user.id, label: user.name}
      });
    }
    return options;
  }
  handleValueChange = (value) => {
    this.props.bulkUpdate(this.state.value, value);
  }
}
