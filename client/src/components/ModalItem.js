import React, { Component } from 'react';
import Select from 'react-select';

const colourStyles = {
  control: styles => ({ 
    ...styles,
    backgroundColor: '#ebece0' 
  })
};
class ModalItem extends Component {
  render () {
    let { inputType, defaultValue, labelValue, classNames, config, options } = this.props;
    options = options || [{
      value: 'abc',
      label: 'ABC'
    }, {
      value: 'xyz',
      label: 'XYZ'
    }];

    classNames = classNames || {};
    config = config || {};
    // decide type of the input
    switch (inputType.dom) {
      case 'select': inputType = <Select styles={colourStyles} defaultValue={defaultValue} options={options} isSearchable={true}/>; break;
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
