import React, { Component } from 'react';

class ListItem extends Component {
  render () {
    console.log(this.props.info);
    return (
      <div className='list-item'>
        {JSON.stringify(this.props.info, null, 4)}
      </div>
    );
  }
}

export default ListItem;
