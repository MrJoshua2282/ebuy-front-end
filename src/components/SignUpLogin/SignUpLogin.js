import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './SignUpLogin.css';
import Title from '../../shared/Title/Title';
import Input from '../../shared/Input/Input';
import Spinner from '../../shared/Spinner/Spinner';
import { FormBtn } from '../../shared/Btn/Btns';
import { ProductsContext } from '../../context';
import * as actionCreators from '../../store/actionCreators';

class SignUpLogin extends Component {
  state = {
    isLoadingSignup: false,
    isLoadingLogin: false,
    form1IsValid: false,
    form2IsValid: false,
    form1: [
      // First Name
      {
        id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: {
          type: 'text', placeholder: 'first name'
        }, value: '', pattern: '(?=.*[a-zA-Z]).{1,}'
      },

      // Last Name
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'last name' }, value: '', pattern: '(?=.*[a-zA-Z]).{1,}' },

      // Email
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'email', placeholder: 'email' }, value: '', pattern: ".{1,}" },

      // Password
      { id: 'a password containing at least 8 characters', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'password' }, value: '', pattern: ".{8,}" },
    ],
    form2: [
      // Email
      { id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'email', placeholder: 'email' }, value: '', pattern: ".{1,}" },

      // Password
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'password' }, value: '', pattern: ".{1,}" },
    ]
  }

  static contextType = ProductsContext;

  inputChangeHandler = (event, itemId, form) => {
    const { copyForm, formIsValid } = this.context.validationHandler(event, itemId, form)

    if (form === this.state.form1) {
      this.setState({ form1: copyForm, form1IsValid: formIsValid })

    } else if (form === this.state.form2) {
      this.setState({ form2: copyForm, form2IsValid: formIsValid })
    }
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

    if (form === this.state.form2) {
      this.setState({ form2: copyForm })
    } else if (form === this.state.form1) {
      this.setState({ form1: copyForm })
    }
  }

  loginHandler = (event) => {
    event.preventDefault();
    this.props.login(this.state.form2[0].value, this.state.form2[1].value, this.props.history, () => this.resetForm(this.state.form2));
  }

  signupHandler = async (event) => {
    event.preventDefault();
    let body = {
      firstName: this.state.form1[0].value,
      lastName: this.state.form1[1].value,
      email: this.state.form1[2].value,
      password: this.state.form1[3].value,
    }
    this.props.signupHandler(body, this.props.history, () => this.resetForm(this.state.form1));
  }

  render() {
    let form1El = this.state.form1.map((el, i) => {
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

    let form2El = this.state.form2.map((el, i) => {
      return <Input
        key={i}
        elType={el.elType}
        value={el.value}
        attributes={el.attributes}
        onChange={(event) => this.inputChangeHandler(event, i, this.state.form2)}
        valid={el.valid}
        shouldValidate={el.validation}
        touched={el.touched}
        valueType={el.id}
      />
    });

    return (
      <section className='section-form'>
        <form className='form-body' onSubmit={(event) => this.loginHandler(event,)}>
          <Title title='Login' className='small-padding' />
          {form2El}
          <div className='signupLogin-div-btn'>
            {this.state.isLoadingLogin ? <Spinner /> : <FormBtn type='submit' disabled={!this.state.form2IsValid}>Welcome Back!</FormBtn>}
          </div>
        </form>

        <form className='form-body' onSubmit={this.signupHandler}>
          <Title title='Signup' className='small-padding' />
          {form1El}
          <div className='signupLogin-div-btn'>
            {this.state.isLoadingSignup ? <Spinner /> : <FormBtn type='submit' disabled={!this.state.form1IsValid}>Join the crew!</FormBtn>}
          </div>
        </form>
      </section>
    );
  }
};

const mapStateToProps = state => {
  return {
    resetLoginForm: state.resetLoginForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleErrorModalHandler: () => dispatch(actionCreators.toggleErrorModalHandler()),
    setErrorHandler: (message) => dispatch(actionCreators.setErrorHandler(message)),
    login: (email, password, history, resetForm) => dispatch(actionCreators.login(email, password, history, resetForm)),
    signupHandler: (body, history, resetForm) => dispatch(actionCreators.signupHandler(body, history, resetForm))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpLogin));
