import React, { Component } from 'react';
import ListItem from './ListItem';
import '../css/listmanager.css';

class ListManager extends Component {
  render () {
    let {onItemClick, onItemDelete, issueIdMap, showList, logIssue, data} = this.props,
      itemInfo = this.getListItems(),
      listItems;

    listItems = itemInfo.map((info, index) => <ListItem 
      onItemClick={onItemClick}
      onItemDelete={onItemDelete}
      issueIdMap={issueIdMap}
      info={info}
      index={index}
      key={index} 
    />);
    
    return (
      <div className={this.props.project ? 'list-manager' : 'hide'}>
        <div className='list-item-container'>
          {listItems}
        </div>
        <div id='log-btn'>
          <button className={showList && data.length ? 'btn': 'hide'} onClick={ () => {logIssue(data)}}>Log Issues</button>
        </div>
      </div>
    );
  }

  getListItems () {
    debugger;
    let data = this.props.data || [],
      i,
      len = data.length,
      retAr = [];

    for (i = 0; i < len; i++) {
      retAr.push(data[i]);
    }

    return retAr;
  }

}

export default ListManager;
