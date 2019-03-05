import React, { Component } from 'react';
import '../css/listitem.css'
class ListItem extends Component {
  render () {
    return (
      <div className='list-item' onClick={(e) => {this.handleClick(e)}}>
        {JSON.stringify(this.props.info, null, 4)}
      </div>
    );
  }
  handleClick = (e) => {
    console.log(e.target);
    e.target.style.height = '300px';
  }
}

export default ListItem;
