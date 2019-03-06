import React, { Component } from 'react'

class ModalItem extends Component {
  render () {
    let { inputType, defaultValue, labelValue, classNames, config } = this.props;

    classNames = classNames || {};
    config = config || {};
    // decide type of the input
    switch (inputType.dom) {
      case 'input': inputType = <input type={inputType.type} className={classNames.input} defaultValue={defaultValue}></input>; break;
      case 'textarea': inputType = <textarea className={classNames.input || 'data-textarea'} rows={config.rows} col={config.cols} defaultValue={defaultValue}></textarea>; break;
      default: inputType = undefined;
    }

    return (
      <div className={classNames.container || 'data-selector'}>
        <label className={classNames.label || 'data-label'}>{labelValue}</label>
        {inputType}
      </div>
    );
  }
}

export default ModalItem;
