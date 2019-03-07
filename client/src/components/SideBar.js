import React, { Component } from 'react';
import '../css/sidebar.css';
import Select from 'react-select';

export default class SideBar extends Component {
  render() {
    let projects = [ ...this.props.userData.projects ],
    options = projects.map((project) => {
      return {value: project.key, label: project.name}
    })
    return (
      <div className="side-bar">
        <div className="project-selector">
        <Select isSearchable={true} options={options} placeholder='select project' onChange={(e) => {this.handleProjectChange(e.value)}}/>
        </div>
      </div>
    )
  }
  handleProjectChange = (project) => {
    this.props.setProjectInIssues(project);
  }
}
