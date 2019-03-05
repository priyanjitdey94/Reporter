import React, { Component } from 'react';
import '../css/listitem.css'
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    }
  }
  render () {
    let { isClicked } = this.state;
    return (
      <div className={isClicked ? 'list-item-clicked' : 'list-item' } onClick={() => {this.handleClick(!isClicked)}}>
        {JSON.stringify(this.props.info, null, 4)}
      </div>
    );
  }
  handleClick = (value) => {
    this.setState({isClicked: value});
  }
}

export default ListItem;
