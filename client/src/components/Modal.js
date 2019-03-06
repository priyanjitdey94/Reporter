import React, { Component } from 'react';
import '../css/modal.css';

class Modal extends Component {
  render () {
    return (
      <div className='modal-background'>
        <div className='modal-container'>
          <div className='modal-header'>
            <button className='modal-header-button'  onClick={this.handler} >X</button>
          </div>
          <div className='modal-body'>
            <div className='data-selector'>
              <label className='data-label'>Project</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Issue type</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Summary</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Priority</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Affect Version</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Assignee</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Reviewer</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Reporter</label>
              <input type='text'></input>
            </div>
            <div className='data-selector'>
              <label className='data-label'>Description</label>
              <textarea className='data-textarea'></textarea>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='modal-footer-button'  onClick={this.handler} >Cancel</button>
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
