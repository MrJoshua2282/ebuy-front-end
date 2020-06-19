import React, { Component } from 'react';

import './GlobalModal.css';
import Input from '../Input/Input';
import Title from '../../components/Title/Title';
import { FormBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';

class UpdateAccountInfo extends Component {
  state = {
    form1: [
      // First Name
      {
        id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: {
          type: 'text', placeholder: 'first name'
        }, value: '', pattern: ""
      },

      // Last Name
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'last name' }, value: '', pattern: "" },

      // Email
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'email' }, value: '', pattern: '(?=.*@)' },

      // Password
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'password' }, value: '', pattern: "" },

      // New Password
      { id: 'a password containing at least 8 characters', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'new password' }, value: '', pattern: ".{8,}" },
    ],
    form1IsValid: false
  }

  checkValidity = (value, validation, pattern) => {
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (pattern) {
      isValid = value.search(pattern) > -1;
    }
    return isValid;
  }

  inputChangeHandler = (event, itemId, form) => {
    const { value } = event.target;

    let copyForm = [...form];

    copyForm = copyForm.map((el, i) => {
      if (i === itemId) {
        el.value = value;
        el.valid = this.checkValidity(el.value, el.validation, el.pattern);
        el.touched = true;
      }
      return el;
    });

    let formIsValid = true;
    formIsValid = form.every(el => el.valid && formIsValid);

    this.setState({ form1: copyForm, form1IsValid: formIsValid });
  }

  render() {
    const elForm = this.state.form1.map((el, i) => {
      return <Input
        key={i}
        elType={el.elType}
        value={el.value}
        attributes={el.attributes}
        onChange={(event) => this.inputChangeHandler(event, i, this.state.form1)}
        valid={el.valid}
        shouldValidate={el.validation}
        touched={el.touched}
        valueType={el.id}
      />
    });
    return (
      <React.Fragment>
        <form>
          <Title title='Update Personal Info' />
          {elForm}
          <FormBtn type='submit' disabled={!this.state.form1IsValid}>Submit Changes</FormBtn>
        </form>
      </React.Fragment>
    )
  }
}

export default UpdateAccountInfo;