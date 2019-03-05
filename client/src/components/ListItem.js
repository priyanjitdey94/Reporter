import React, { Component } from 'react';

class ListItem extends Component {
  render () {
    return (
      <div className='List-item'>
        {this.props.info.Description}
      </div>
    );
  }
}

export default ListItem;
