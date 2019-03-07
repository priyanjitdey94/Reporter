import React, { Component } from 'react';
import ModalItem from './ModalItem';
import '../css/modal.css';

const project = 'project',
  issuetype = 'issuetype',
  summary = 'summary',
  priority = 'priority',
  affectversions = 'affectversions',
  assignee = 'assignee',
  reviewer = 'reviewer',
  reporter = 'reporter',
  testdata = 'testdata',
  dom = {
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
  constructor (props) {
    super(props);
    
    let info = props.info;
    this.state = {
      [project]: info.project || '',
      [issuetype]: info.Type || '',
      [summary]: info.Title || '',
      [priority]: info.Priority || '',
      [affectversions]: info['Affect Versions'] || '',
      [assignee]: info.Assignee || '',
      [reviewer]: info.Reviewer || '',
      [reporter]: info.Reporter || '',
      [testdata]: info['Test Data'] || {}
    };
  }
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
              id={project}
              onChange={this.updateInfo}
              labelValue='Project'/>
            <ModalItem 
              inputType={dom.select} 
              options={bugTypeOptions} 
              defaultValue={{value: info.Type, label: info.Type}} 
              id={issuetype}
              onChange={this.updateInfo}
              labelValue='Issue type'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Title} 
              id={summary}
              onChange={this.updateInfo}
              labelValue='Summary'/>
            <ModalItem 
              inputType={dom.select} 
              options={priorityOptions} 
              defaultValue={{value: info.Priority, label: info.Priority}} 
              id={priority}
              onChange={this.updateInfo}
              labelValue='Priority'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info['Affect Versions']} 
              id={affectversions}
              onChange={this.updateInfo}
              labelValue='Affect Version/s'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Assignee} 
              id={assignee}
              onChange={this.updateInfo}
              labelValue='Assignee'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Reviewer} 
              id={reviewer}
              onChange={this.updateInfo}
              labelValue='Reviewer'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.Reporter} 
              id={reporter}
              onChange={this.updateInfo}
              labelValue='Reporter'/>
            <ModalItem 
              inputType={dom.textarea} 
              classNames={{input: 'data-textarea'}} 
              config={{rows: 20, cols: 30}} 
              defaultValue={description} 
              id={testdata}
              onChange={this.updateInfo}
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

  updateInfo = (id, value) => {
    this.setState({
      [id]: value
    });
  }
  handler = () => {
    if (this.validateInput()) {
      this.props.onClickHandler();
    } else {
      console.log('Invalid Input');
    }
  }

  validateInput = () => {
    return true;
  }
}

export default Modal;
