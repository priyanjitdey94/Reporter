import React, { Component } from 'react';
import '../css/modal.css';

class Modal extends Component {
  render () {
    return (
      <div className='modal-background' onClick={this.handler}>
        <div className='modal-container'>
          <div className='modal-header'>
            <button className='modal-header-button'>X</button>
          </div>
          <div className='modal-body'>
          </div>
          <div className='modal-footer'>
            <button className='modal-footer-button'>Cancel</button>
            <button className='modal-footer-button'>Apply</button>
          </div>
        </div>
      </div>
    );
  }

  handler = () => {
    this.props.onClickHandler();
  }
}

export default Modal;
