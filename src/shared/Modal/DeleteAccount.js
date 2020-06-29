import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './GlobalModal.css';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import { FormBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';

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

  createProductHandler = async (event) => {
    event.preventDefault();

    try {
      this.setState(() => {
        return { isLoading: true }
      })
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/delete-user/5ef49b1425cc0971d99c9e42`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token,
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
        body: JSON.stringify({
          email: this.state.form1[0].value,
          password: this.state.form1[1].value,
        })
      })

      let copyForm = [...this.state.form1];
      copyForm.map(el => {
        el.value = '';
        el.valid = false;
        el.touched = false;
        return el;
      });
      this.setState({ form1: copyForm, form1IsValid: false });
      setTimeout(() => {
        this.props.history.replace('/');
      }, 250);
      this.context.toggleSignedInHandler();
      this.context.closeModalHandler();

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
        <form onSubmit={this.createProductHandler} >
          <Title title='Delete Account' />
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn className='clearBtn' id='danger' type='submit' disabled={!this.state.form1IsValid}>Delete Account</FormBtn>}
        </form>
      </React.Fragment >
    )
  }
}

export default withRouter(DeleteAccount);