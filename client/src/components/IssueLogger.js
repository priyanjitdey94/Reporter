import React, { Component } from 'react'

export default class IssueLogger extends Component {
  render() {
      let issues = this.props.issues.map((issue, index) => {
          return <div key={index} className='issue-link'><a href={`https://fusioncharts.jira.com/browse/${issue.key}`}>{issue.key}</a></div>
      });

    return (
      <div className={this.props.showIssueLogger ? 'issue-logger' : 'hide'}>
        <button className='logger-close-button'  onClick={this.clickHandler}>&#10006;</button>
        <div className="issue-logger-screen">{issues}</div>
      </div>
    )
  }
  clickHandler = () => {
    this.props.handleLoggerDisplay(false);
  }
}
