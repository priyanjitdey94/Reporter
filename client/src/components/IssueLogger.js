import React, { Component } from 'react'

export default class IssueLogger extends Component {
  render() {
      let issues = this.props.issues.map((issue, index) => {
          return <div key={index} className='issue-link'><a href={`https://fusioncharts.jira.com/browse/${issue.key}`} target="_blank" rel="noopener noreferrer">{issue.key}</a></div>
      });

    return (
      <div className='issue-logger-container'>
        <div className={this.props.showIssueLogger ? 'issue-logger' : 'hide'}>
          <div className='logger-close-btn-container'>
          <button className='logger-close-button'  onClick={this.clickHandler}>&#10006;</button>
          </div>
          <div className="issue-logger-screen">{issues}</div>
        </div>
      </div>
    )
  }
  clickHandler = () => {
    this.props.handleLoggerDisplay(false);
  }
}
