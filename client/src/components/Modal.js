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
            <div className='data-selector'>
              <label>Project</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Issue type</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Summary</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Priority</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Affect Version</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Assignee</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Reviewer</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Reporter</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label>Description</label>
              <input type='textarea'></input>
            </div>
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
