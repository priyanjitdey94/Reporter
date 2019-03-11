import React, { Component } from 'react';
import ModalItem from './ModalItem';
import {priorityOptions} from '../utils/utility';
import '../css/modal.css';

const ISSUETYPE = 'issuetype',
  SUMMARY = 'summary',
  PRIORITY = 'priority',
  AFFECTEDVERSIONS = 'affectversions',
  ASSIGNEE = 'assignee',
  REVIEWER = 'reviewer',
  REPORTER = 'reporter',
  DESCRIPTION = 'description',
  PROJECT = 'project',
  TESTDATA = 'testdata',
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
  getIssueTypes = issuetypes => {
    return issuetypes.map(issuetype => {
      return {
        value: issuetype.id,
        label: issuetype.name
      };
    })
  },
  getSelectList = valueLabelObj => {
    let list = [],
      itr;

    for (itr in valueLabelObj) {
      list.push({
        value: itr,
        label: valueLabelObj[itr]
      });
    }
    return list;
  };

class Modal extends Component {
  constructor (props) {
    super(props);
    
    let info = props.info;
    this.state = {
      [ISSUETYPE]: info.issuetype || '',
      [SUMMARY]: info.summary || '',
      [PRIORITY]: info.priority || '',
      [AFFECTEDVERSIONS]: info.affectversions || '',
      [ASSIGNEE]: info.assignee || '',
      [REVIEWER]: info.reviewer || '',
      [REPORTER]: info.reporter || '',
      [TESTDATA]: info.testdata || {}
    };
  }
  render () {
    let { info, project, issueIdMap, versionIdMap, userNameMap } = this.props,
      description = JSON.stringify(JSON.parse(info.testdata), undefined, 4);
    return (
      <div className='modal-background'>
       <div className='modal-container'>
          <div className='modal-header'>
          <button className='modal-header-button'  onClick={this.handler}>&#10006;</button>
          </div>
          <div className='modal-body'>
            <ModalItem 
              inputType={dom.select} 
              options={getIssueTypes(project.issuetypes)} 
              defaultValue={{value: info.issuetype, label: issueIdMap.idToIssue[info.issuetype]}} 
              id={ISSUETYPE}
              onChange={this.updateInfo}
              labelValue='Issue type'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.summary} 
              id={SUMMARY}
              onChange={this.updateInfo}
              labelValue='Summary'/>
            <ModalItem 
              inputType={dom.select} 
              options={getSelectList(priorityOptions.idPriorityMap)} 
              defaultValue={{value: info.priority, label: priorityOptions.idPriorityMap[info.priority]}} 
              id={PRIORITY}
              onChange={this.updateInfo}
              labelValue='Priority'/>
            <ModalItem 
              inputType={dom.select} 
              options={getSelectList(versionIdMap.idToVersion)}
              defaultValue={{value: info.affectversions, label: versionIdMap.idToVersion[info.affectversions]}} 
              id={AFFECTEDVERSIONS}
              onChange={this.updateInfo}
              labelValue='Affect Version/s'/>
            <ModalItem 
              inputType={dom.select} 
              options={getSelectList(userNameMap.nameToDisp)}
              defaultValue={{value: info.assignee, label: userNameMap.nameToDisp[info.assignee]}} 
              id={ASSIGNEE}
              onChange={this.updateInfo}
              labelValue='Assignee'/>
            <ModalItem 
              inputType={dom.input} 
              defaultValue={info.description} 
              id={DESCRIPTION}
              onChange={this.updateInfo}
              labelValue='Description'/>
            <ModalItem 
              inputType={dom.textarea} 
              classNames={{input: 'data-textarea'}} 
              config={{rows: 20, cols: 30}} 
              defaultValue={description} 
              id={TESTDATA}
              onChange={this.updateTestdata}
              labelValue='Description'/>
          </div>
          <div className='modal-footer'>
            <button className='modal-footer-button modal-footer-cancel-button'  onClick={this.handler} >Cancel</button>
            <button className='modal-footer-button modal-footer-apply-button' onClick={this.submitHandler}>Apply</button>
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
    this.props.onClickHandler();
  }

  submitHandler = () => {
    let retObj,
      {issuetype, summary, priority, affectversions, assignee, reviewer, reporter, description, testdata} = this.state;

    retObj = Object.assign({
      [ISSUETYPE]: issuetype,
      [SUMMARY]: summary,
      [PROJECT]: this.props.project.key,
      [PRIORITY]: priority,
      [AFFECTEDVERSIONS]: affectversions,
      [ASSIGNEE]: assignee,
      [REVIEWER]: reviewer,
      [REPORTER]: reporter,
      [DESCRIPTION]: description,
      [TESTDATA]: testdata
    });

    this.props.onApply(retObj, this.props.index);
    this.handler();
  }

  isValidJSON = value => {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }
  updateTestdata = (id, value) => {
    if (this.isValidJSON(value)) {
      this.updateInfo(id, value);
    }
  }
}

export default Modal;
