import React, { Component } from 'react';
import ModalItem from './ModalItem';
import '../css/modal.css';

const dom = {
    'input': {
      dom: 'input',
      type: 'text'
    },
    'textarea': {
      dom: 'textarea'
    }
  };

class Modal extends Component {
  render () {
    let { info } = this.props,
      description = JSON.stringify(JSON.parse(info['Test Data']), undefined, 4);
    return (
      <div className='modal-background'>
        <div className='modal-container'>
          <div className='modal-header'>
            <button className='modal-header-button'  onClick={this.handler} >X</button>
          </div>
          <div className='modal-body'>
            <ModalItem inputType={dom.input} defaultValue='' labelValue='Project'/>
            <ModalItem inputType={dom.input} defaultValue={info.Type} labelValue='Issue type'/>
            <ModalItem inputType={dom.input} defaultValue={info.Title} labelValue='Summary'/>
            <ModalItem inputType={dom.input} defaultValue={info.Priority} labelValue='Priority'/>
            <ModalItem inputType={dom.input} defaultValue={info['Affect Versions']} labelValue='Affect Version/s'/>
            <ModalItem inputType={dom.input} defaultValue={info.Assignee} labelValue='Assignee'/>
            <ModalItem inputType={dom.input} defaultValue={info.Reviewer} labelValue='Reviewer'/>
            <ModalItem inputType={dom.textarea} classNames={{input: 'data-textarea'}} config={{rows: 20, cols: 30}} defaultValue={description} labelValue='Description'/>
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
