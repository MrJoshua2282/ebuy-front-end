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
    file: '',
    previewUrl: '',
    isLoading: false,
    form1: [
      // Product Name
      {
        id: '', valid: false, validation: { required: true, touched: true }, elType: 'input', attributes: {
          type: 'text', placeholder: 'product name'
        }, value: '', pattern: ".{1,}"
      },

      // Price
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'number', placeholder: 'price', min: "0.01", step: ".01" }, value: '', pattern: ".{1,}" },

      // Description
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'textarea', attributes: { type: 'text', placeholder: 'description' }, value: '', pattern: ".{1,}" },

      // Image
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'file', placeholder: 'image', accept: '.jpg, .png,.jpeg' }, value: '', pattern: ".{1,}" },

      // Company
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'company' }, value: '', pattern: ".{1,}" },

      // Inventory
      { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'number', placeholder: 'inventory count', min: "0", step: "1" }, value: '', pattern: ".{1,}" },
    ],
    form1IsValid: false
  }

  checkValidity = (value, validation, pattern) => {
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    // if (validation.minLength) {
    //   isValid = value.length >= validation.minLength && isValid;
    // }
    if (pattern) {
      isValid = value.search(pattern) > -1;
    }
    return isValid;
  }

  fileReaderHandler = (file) => {

    this.setState({ file: file });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.setState({ previewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(file);
  }

  inputChangeHandler = (event, itemId, form) => {
    const { value } = event.target;

    let copyForm = [...form];

    copyForm = copyForm.map((el, i) => {
      if (i === itemId) {
        if (el.attributes.type === 'file') {
          this.fileReaderHandler(event.target.files[0]);
        }

        el.value = value;
        el.valid = this.checkValidity(el.value, el.validation, el.pattern);
        el.validation.touched = true;
      }
      return el;
    });

    let formIsValid = true;
    formIsValid = form.every(el => el.valid && formIsValid);

    this.setState({ form1: copyForm, form1IsValid: formIsValid });
  }

  createProductHandler = async (event) => {
    event.preventDefault();
    // new FormData() is already available on browsers
    // can add binary data/files/images as well as text data
    try {
      const formData = new FormData();
      formData.append('title', this.state.form1[0].value);
      formData.append('price', this.state.form1[1].value);
      formData.append('description', this.state.form1[2].value);
      formData.append('image', this.state.file);
      formData.append('company', this.state.form1[4].value);
      formData.append('inventory', this.state.form1[5].value);

      this.setState({ isLoading: true })

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + this.context.token,
        }
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      let copyForm = [...this.state.form1];
      copyForm.map(el => {
        el.value = '';
        el.valid = false;
        el.validation.touched = false;
        return el;
      });
      this.setState({ form1: copyForm, form1IsValid: false, file: '' });

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
          {this.state.file && <div><img style={{ height: '5rem' }} src={this.state.previewUrl} alt='preview' /></div>}
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn type='submit' disabled={!this.state.form1IsValid}>Create!</FormBtn>}
        </form>
      </React.Fragment >
    )
  }
}

export default UpdateAccountInfo;