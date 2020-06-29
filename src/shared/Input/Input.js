import React from 'react';

import './GlobalInput.css';

const Input = (props) => {
  let element = '';
  let validationClass;
  let validationError = '';
  if (!props.valid && props.shouldValidate && props.touched) {
    validationClass = 'invalid-form1';
  }

  if (!props.valid && props.touched && props.valueType) {
    validationError = <p>Please enter {props.valueType.toLowerCase()}</p>;
  }

  switch (props.elType) {
    case 'input':
      element = <input className={`input  ${validationClass} ${props.className}`} {...props.attributes} value={props.value} onChange={props.onChange} />;
      break;
    case 'textarea':
      element = <textarea className={`input ${validationClass} ${props.className}`} {...props.attributes} value={props.value} onChange={props.onChange} />;
      break;
    case 'select':
      element = <select className={`input ${validationClass} ${props.className}`} value={props.value} onChange={props.onChange}>
        {props.attributes.options.map((el, i) => {
          return (<option key={i} value={el.value}>{el.displayValue}</option>)
        })}
      </select>;
      break;
    default:
      element = <input className={`input ${validationClass} ${props.className}`} {...props.attributes} value={props.value} onChange={props.onChange} />;
  }

  return (
    <div className='inputDiv'>
      <label className='inputLabel'>{props.label}</label>
      {element}
      {validationError}
    </div>
  );
}

export default Input;