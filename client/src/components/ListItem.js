import React, { Component } from 'react';

class ListItem extends Component {
  render () {
    return (
      <div className='list-item'>
        {this.props.info.Description}
      </div>
    );
  }
}

export default ListItem;
