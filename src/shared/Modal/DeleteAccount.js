import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './GlobalModal.css';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import { FormBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';
import * as actionCreators from '../../store/actionCreators';

class DeleteAccount extends Component {

  static contextType = ProductsContext;
  state = {
    isLoading: false,
    form1: [
      // Email
      {
        id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: {
          type: 'text', placeholder: 'email'
        }, value: '', pattern: ".{1,}"
      },

      // Password
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'password', placeholder: 'password' }, value: '', pattern: ".{1,}" },
    ],
    form1IsValid: false
  }

  inputChangeHandler = (event, itemId, form) => {
    const { copyForm, formIsValid } = this.context.validationHandler(event, itemId, form)
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

  deleteAccountHandler = (event) => {
    event.preventDefault();

    let body = {
      email: this.state.form1[0].value,
      password: this.state.form1[1].value,
    }

    this.props.deleteAccount(body, this.props.token, () => this.resetForm(this.state.form1), this.props.history);
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
        <form onSubmit={this.deleteAccountHandler} >
          <Title title='Delete Account' />
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn className='clearBtn' id='danger' type='submit' disabled={!this.state.form1IsValid}>Delete Account</FormBtn>}
        </form>
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleErrorModalHandler: () => dispatch(actionCreators.toggleErrorModalHandler()),
    setErrorHandler: (message) => dispatch(actionCreators.setErrorHandler(message)),
    closeModalHandler: () => dispatch(actionCreators.closeModalHandler()),
    signOutHandler: () => dispatch(actionCreators.signOutHandler()),
    deleteAccount: (body, token, resetForm, history) => dispatch(actionCreators.deleteAccount(body, token, resetForm, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteAccount));