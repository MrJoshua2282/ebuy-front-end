import React from 'react';

import './GlobalInput.css';
import { ReturnBtn } from '../Btn/Btns'

const Input = (props) => {
  let element = null;
  let validationClass;
  let validationError = null;
  if (!props.valid && props.shouldValidate && props.touched) {
    validationClass = 'invalid-form1 ';
  }

  if (!props.valid && props.touched && props.valueType) {
    validationError = <p>Please enter {props.valueType.toLowerCase()}</p>;
  }

  switch (props.elType) {
    case 'input':
      element = <input className={`input ${validationClass} ${props.className}`} {...props.attributes} value={props.value} onChange={props.onChange} />;
      break;
    case 'inputFile':
      element = (
        <React.Fragment>
          <input className={`input ${validationClass} ${props.className}`} {...props.attributes} style={{ display: 'none' }} value={props.value} onChange={props.onChange} />
          <div className='image-preview'>
            <img src="" alt="Preview" />
          </div>
          <ReturnBtn type='button'>Select Image</ReturnBtn>
        </React.Fragment>
      );
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