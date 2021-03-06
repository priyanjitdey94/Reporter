import React, { Component } from 'react';
import '../css/listitem.css';
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    }
  }
  render () {
    let { info, issueIdMap } = this.props, 
      type = (Object.keys(issueIdMap.idToIssue).length && issueIdMap.idToIssue[info.issuetype]) || '',
      title = info.summary || '';
    return (
      <div className='list-item' onClick={() => {this.handleClick()}}>
        <div className='issue-type'>{type}</div>
        <div className='issue-title'>{title}</div>
        <div className='issue-delete' onClick={this.deleteIssue}>&#10005;</div>
      </div>
    );
  }

  deleteIssue = (event) => {
    event.stopPropagation();
    this.props.onItemDelete(this.props.index);
  }

  handleClick = (value) => {
    this.props.onItemClick(this.props.info, this.props.index);
    // let { isClicked } = this.state;
    // this.setState({isClicked: !isClicked});
  }
}

export default ListItem;
