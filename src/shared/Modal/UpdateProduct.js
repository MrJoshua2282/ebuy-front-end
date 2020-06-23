import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'



import './GlobalModal.css';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import { FormBtn } from '../Btn/Btns';

import { ProductsContext } from '../../context';
// const Component = withRouter(({ history, location }) => {

// })


class UpdateProduct extends Component {
  static contextType = ProductsContext;
  state = {
    isLoading: false,
    form1: [
      // Image
      {
        id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: {
          type: 'file', placeholder: 'image'
        }, value: ``, pattern: "", label: 'Image'
      },

      // Product Name
      { id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'product name' }, value: `${this.context.productForUpdating.title}`, pattern: "", label: 'Product Name' },

      // Company
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'company' }, value: `${this.context.productForUpdating.company}`, pattern: '', label: 'Company' },

      // Price
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'number', placeholder: 'price' }, value: `${this.context.productForUpdating.price}`, pattern: "", label: 'Price' },

      // Inventory
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'number', placeholder: 'inventory' }, value: `${this.context.productForUpdating.inventory}`, pattern: "", label: 'Inventory' },

      // Description
      { id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'description' }, value: `${this.context.productForUpdating.description}`, pattern: "", label: 'Description' },
    ],
    form1IsValid: true
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

  updateAccountHandler = async (event) => {
    event.preventDefault();

    try {
      this.setState(() => {
        return { isLoading: true }
      });
      const response = await fetch(`http://localhost:5000/api/products/${this.context.productForUpdating.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
        body: JSON.stringify({
          image: this.state.form1[0].value,
          title: this.state.form1[1].value,
          company: this.state.form1[2].value,
          price: this.state.form1[3].value,
          inventory: this.state.form1[4].value,
          description: this.state.form1[5].value,
          userId: this.context.userInfo.user.id
        })
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const { location, history } = this.props;
      history.replace('/');
      history.replace('/account');
      this.context.closeModalHandler();
      // console.log(responseData)

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
        label={el.label}
      />
    });
    return (
      <React.Fragment>
        <form onSubmit={this.updateAccountHandler}>
          <Title title='Update Item' />
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn type='submit'>Submit Update</FormBtn>}
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(UpdateProduct);