import React, { Component } from 'react';
import ModalItem from './ModalItem';
import '../css/modal.css';

const ISSUETYPE = 'issuetype',
  SUMMARY = 'summary',
  PRIORITY = 'priority',
  AFFECTEDVERSIONS = 'affectversion',
  ASSIGNEE = 'assignee',
  REVIEWER = 'reviewer',
  REPORTER = 'reporter',
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
  priorityOptions = [{
    value: '1',
    label: 'Blocker'
  }, {
    value: '2',
    label: 'Critical'
  }, {
    value: '3',
    label: 'Major'
  }, {
    value: '4',
    label: 'Major'
  }, {
    value: '5',
    label: 'Trivial'
  }], 
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
  },
  getPriorityId = priority => {
    let i, len;
    for (i = 0, len = priorityOptions.length; i < len; i++) {
      if (priority === priorityOptions[i].label) {
        return priorityOptions[i].value;
      }
    }
  };

class Modal extends Component {
  constructor (props) {
    super(props);
    
    let info = props.info;
    this.state = {
      [ISSUETYPE]: info.issuetype || '',
      [SUMMARY]: info.summary || '',
      [PRIORITY]: getPriorityId(info.priority) || '',
      [AFFECTEDVERSIONS]: info.affectversion || '',
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
              options={priorityOptions} 
              defaultValue={{value: priorityOptions.find(option => option.label === info.priority), label: info.priority}} 
              id={PRIORITY}
              onChange={this.updateInfo}
              labelValue='Priority'/>
            <ModalItem 
              inputType={dom.select} 
              options={getSelectList(versionIdMap.idToVersion)}
              defaultValue={{value: info.affectversion, label: versionIdMap.idToVersion[info.affectversion]}} 
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
              inputType={dom.textarea} 
              classNames={{input: 'data-textarea'}} 
              config={{rows: 20, cols: 30}} 
              defaultValue={description} 
              id={TESTDATA}
              onChange={this.updateInfo}
              labelValue='Description'/>
          </div>
          <div className='modal-footer'>
            <button className='modal-footer-button modal-footer-cancel-button'  onClick={this.handler} >Cancel</button>
            <button className='modal-footer-button modal-footer-apply-button' onClick={this.submitHandler}>Apply</button>
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
      {issuetype, summary, priority, affectversion, assignee, reviewer, reporter, testdata} = this.state;

    retObj = Object.assign({
      [ISSUETYPE]: issuetype,
      [SUMMARY]: summary,
      [PRIORITY]: priority,
      [AFFECTEDVERSIONS]: affectversion,
      [ASSIGNEE]: assignee,
      [REVIEWER]: reviewer,
      [REPORTER]: reporter,
      [TESTDATA]: testdata
    });

    this.props.onApply(retObj, this.props.index);
    this.handler();
  }

  validateInput = () => {
    return true;
  }
}

export default Modal;
