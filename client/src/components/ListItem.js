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
    let { info } = this.props, 
      type = info.type || 'Bug',
      description = info.description || '';
    return (
      <div className='list-item' onClick={() => {this.handleClick()}}>
        <div className='issue-type'>{type}</div>
        <div className='issue-description'>{description}</div>
        <div className='issue-delete'>X</div>
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
