import React, { Component } from 'react';
import ListItem from './ListItem';
import '../css/listmanager.css';

class ListManager extends Component {
  render () {
    let itemInfo = this.getListItems(),
      listItems;

    listItems = itemInfo.map((info, index) => <ListItem info={info} key={index} />);
    return (
      <div className='list-manager'>
        <div className='list-item-container'>
          {listItems}
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