import React, { Component } from 'react';

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
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'password' }, value: '', pattern: ".{1,}" },
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

  createProductHandler = async (event) => {
    event.preventDefault();

    try {
      this.setState(() => {
        return { isLoading: true }
      })
      const response = await fetch(`http://localhost:5000/api/products`, {
        method: 'DELET',
        headers: {
          'Content-Type': 'application/json'
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
        body: JSON.stringify({
          email: this.state.form1[0].value,
          password: this.state.form1[1].value,
        })
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      let copyForm = [...this.state.form1];
      copyForm.map(el => el.value = '');
      this.setState({ form1: copyForm, form1IsValid: false });
      console.log(responseData)

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
          <Title title='Create Product' />
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn className='clearBtn' id='danger' type='submit' disabled={!this.state.form1IsValid}>Delete Account</FormBtn>}
        </form>
      </React.Fragment >
    )
  }
}

export default DeleteAccount;