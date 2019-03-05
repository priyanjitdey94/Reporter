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
    return (
      <div className='list-item' onClick={() => {this.handleClick()}}>
        {JSON.stringify(this.props.info, null, 4)}
      </div>
    );
  }
  handleClick = (value) => {
    this.props.onItemClick(this.props.info);
    // let { isClicked } = this.state;
    // this.setState({isClicked: !isClicked});
  }
}

export default ListItem;
