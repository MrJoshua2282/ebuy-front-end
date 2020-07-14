import React, { Component } from 'react';
import { connect } from 'react-redux';

import './GlobalModal.css';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import { FormBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';
import * as actionCreators from '../../store/actionCreators';

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

  resetForm = (form) => {
    let copyForm = [...form];
    copyForm = copyForm.map(el => {
      el = { ...el };
      el.value = '';
      el.valid = false;
      el.touched = false;
      return el;
    });

    this.setState({ form1: copyForm, form1IsValid: false });
  }

  updateAccountHandler = (event) => {
    event.preventDefault();

    const body = {
      firstName: this.state.form1[0].value,
      lastName: this.state.form1[1].value,
      email: this.state.form1[2].value,
      password: this.state.form1[3].value,
      newPassword: this.state.form1[4].value,
    }

    this.props.updateAccount(body, this.props.token, () => this.resetForm(this.state.form1));
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

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setErrorHandler: (message) => dispatch(actionCreators.setErrorHandler(message)),
    toggleErrorModalHandler: () => dispatch(actionCreators.toggleErrorModalHandler()),
    updateAccount: (body, token, resetForm) => dispatch(actionCreators.updateAccount(body, token, resetForm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountInfo);