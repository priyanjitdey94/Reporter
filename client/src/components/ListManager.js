import React, { Component } from 'react';
import ListItem from './ListItem';
import '../css/listmanager.css';

class ListManager extends Component {
  render () {
    let itemInfo = this.getListItems(),
      listItems;

    listItems = itemInfo.map((info, index) => <ListItem 
      onItemClick={this.props.onItemClick}
      onItemDelete={this.props.onItemDelete}
      info={info}
      index={index}
      key={index} 
    />);

    return (
      <div className='list-manager'>
        <div className='list-item-container'>
          {listItems}
        </div>
      </div>
    );
  }

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

}

export default ListManager;
