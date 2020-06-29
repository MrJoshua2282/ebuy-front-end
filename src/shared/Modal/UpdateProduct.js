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
          type: 'file', placeholder: 'image', accept: '.jpg, .png,.jpeg'
        }, value: ``, pattern: "", label: 'Image'
      },

      // Product Name
      { id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'product name' }, value: `${this.context.productForUpdating.title}`, pattern: "", label: 'Product Name' },

      // Company
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'company' }, value: `${this.context.productForUpdating.company}`, pattern: '', label: 'Company' },

      // Price
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'number', placeholder: 'price', min: "0.01", step: ".01" }, value: `${this.context.productForUpdating.price}`, pattern: "", label: 'Price' },

      // Inventory
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'number', placeholder: 'inventory', min: "0", step: "1" }, value: `${this.context.productForUpdating.inventory}`, pattern: "", label: 'Inventory' },

      // Description
      { id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'description' }, value: `${this.context.productForUpdating.description}`, pattern: "", label: 'Description' },
    ],
    form1IsValid: true
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
      const formData = new FormData();
      formData.append('image', this.context.file);
      formData.append('title', this.state.form1[1].value);
      formData.append('company', this.state.form1[2].value);
      formData.append('price', this.state.form1[3].value);
      formData.append('inventory', this.state.form1[4].value);
      formData.append('description', this.state.form1[5].value);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${this.context.productForUpdating.id}`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + this.context.token,
        }
      })
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      this.context.resetFileHandler();
      this.context.closeModalHandler();

      const { history } = this.props;
      setTimeout(() => {
        history.replace('/');
        history.replace('/account');
      }, 1000);

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
          {this.state.file && <div><img style={{ height: '5rem' }} src={this.context.previewUrl} alt='preview' /></div>}
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn type='submit'>Submit Update</FormBtn>}
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(UpdateProduct);