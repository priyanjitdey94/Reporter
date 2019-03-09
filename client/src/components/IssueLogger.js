import React, { Component } from 'react'

export default class IssueLogger extends Component {
  render() {
      let issues = this.props.issues.issues.map(issue => {
          return <a href={`https://fusioncharts.jira.com/browse/${issue.key}`}>{issue.key}</a>
      });

    return (
      <div className={this.props.showIssueLogger ? 'issue-logger' : 'hide'}>
        {issues}
      </div>
    )
  }
}
