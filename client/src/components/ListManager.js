import React, { Component } from 'react';
import ListItem from './ListItem';

class ListManager extends Component {
  getListItems () {
    let data = this.props.data || [],
      i,
      len = data.length,
      retAr = [];

    for (i = 0; i < len; i++) {
      retAr.push(data[i]);
    }

    return retAr;
  }

  render () {
    let itemInfo = this.getListItems(),
      listItems;

    listItems = itemInfo.map((info, index) => <ListItem info={info} key={index} />);
    return (
      <div className='list-manager'>
        <div className='list-item-container'>
          {listItems}
        </div>
        <button>Create Issues</button>
      </div>
    );
  }
}

export default ListManager;
