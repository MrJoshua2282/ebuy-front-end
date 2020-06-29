import React, { Component } from 'react';

import './GlobalModal.css';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import { FormBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';

class UpdateAccountInfo extends Component {
  static contextType = ProductsContext;
  state = {
    isLoading: false,
    form1: [
      // First Name
      {
        id: '', valid: true, validation: { required: false, touched: false }, elType: 'input', attributes: {
          type: 'text', placeholder: 'first name'
        }, value: '', pattern: ""
      },

      // Last Name
      { id: '', valid: true, validation: { required: false, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'last name' }, value: '', pattern: "" },

      // Email
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'email', placeholder: 'email (required)' }, value: '', pattern: '(?=.*@)' },

      // Password
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'password', placeholder: 'password (required)' }, value: '', pattern: "" },

      // New Password
      { id: 'a password containing at least 8 characters', valid: true, validation: { required: false, touched: false }, elType: 'input', attributes: { type: 'password', placeholder: 'new password' }, value: '', pattern: ".{8,}" },
    ],
    form1IsValid: false
  }

  inputChangeHandler = (event, itemId, form) => {
    const { copyForm, formIsValid } = this.context.validationHandler(event, itemId, form);
    this.setState({ form1: copyForm, form1IsValid: formIsValid });
  }

  updateAccountHandler = async (event) => {
    event.preventDefault();

    try {
      this.setState(() => {
        return { isLoading: true }
      });
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/update-user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token,
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
        body: JSON.stringify({
          firstName: this.state.form1[0].value,
          lastName: this.state.form1[1].value,
          email: this.state.form1[2].value,
          password: this.state.form1[3].value,
          newPassword: this.state.form1[4].value,
        })
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

    } catch (error) {
      this.context.setErrorHandler(error)
      this.context.toggleErrorModalHandler();
    }

    this.setState(() => {
      return { isLoading: false }
    })
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
        <form onSubmit={this.updateAccountHandler}>
          <Title title='Update Personal Info' />
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn type='submit' disabled={!this.state.form1IsValid}>Submit Changes</FormBtn>}
        </form>
      </React.Fragment>
    )
  }
}

export default UpdateAccountInfo;