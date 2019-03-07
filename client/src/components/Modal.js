import React, { Component } from 'react';
import ModalItem from './ModalItem';
import '../css/modal.css';

const dom = {
    input: {
      dom: 'input',
      type: 'text'
    },
    select: {
      dom: 'select'
    },
    textarea: {
      dom: 'textarea'
    }
  },
  bugTypeOptions = [{
    value: 'bug',
    label: 'Bug'
  },{
    value: 'new feature',
    label: 'New feature'
  }, {
    value: 'improvement',
    label: 'Improvement'
  }, {
    value: 'task',
    label: 'Task'
  }, {
    value: 'reasearch or planning task',
    label: 'Research or Planning task'
  }, {
    value: 'review or qa task',
    label: 'Review or QA task'
  }, {
    value: 'diagnosis',
    label: 'Diagnosis'
  }, {
    value: 'epic',
    label: 'Epic'
  }, {
    value: 'story',
    label: 'Story'
  }],
  priorityOptions = [{
    value: 'blocker',
    label: 'Blocker'
  }, {
    value: 'critical',
    label: 'Critical'
  }, {
    value: 'major',
    label: 'Major'
  }, {
    value: 'minor',
    label: 'Major'
  }, {
    value: 'trivial',
    label: 'Trivial'
  }];

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
            <ModalItem 
              inputType={dom.select}
              defaultValue={{value: 'RED', label: 'RED'}} 
              labelValue='Project'/>
            <ModalItem 
              inputType={dom.select} 
              options={bugTypeOptions} 
              defaultValue={{value: info.Type, label: info.Type}} 
              labelValue='Issue type'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Title} 
              labelValue='Summary'/>
            <ModalItem 
              inputType={dom.select} 
              options={priorityOptions} 
              defaultValue={{value: info.Priority, label: info.Priority}} 
              labelValue='Priority'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info['Affect Versions']} 
              labelValue='Affect Version/s'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Assignee} 
              labelValue='Assignee'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Reviewer} 
              labelValue='Reviewer'/>
            <ModalItem 
              inputType={dom.textarea} 
              classNames={{input: 'data-textarea'}} 
              config={{rows: 20, cols: 30}} 
              defaultValue={description} 
              labelValue='Description'/>
          </div>
          <div className='modal-footer'>
            <button className='modal-footer-button modal-footer-cancel-button'  onClick={this.handler} >Cancel</button>
            <button className='modal-footer-button modal-footer-apply-button'>Apply</button>
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
