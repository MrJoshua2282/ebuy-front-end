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
  state = {
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

  static contextType = ProductsContext;

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

  createProductHandler = async (event) => {
    event.preventDefault();
    // new FormData() is already available on browsers
    // can add binary data/files/images as well as text data

    const formData = new FormData();
    formData.append('title', this.state.form1[0].value);
    formData.append('price', this.state.form1[1].value);
    formData.append('description', this.state.form1[2].value);
    formData.append('image', this.context.file);
    formData.append('company', this.state.form1[4].value);
    formData.append('inventory', this.state.form1[5].value);

    let headers = {
      Authorization: 'Bearer ' + this.props.token,
    }

    this.props.createProduct(formData, headers, () => this.resetForm(this.state.form1), this.context.resetFileHandler);
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
          {this.state.file && <div><img style={{ height: '5rem' }} src={this.props.previewUrl} alt='preview' /></div>}
          {elForm}
          {this.state.isLoading ? <Spinner /> : <FormBtn type='submit' disabled={!this.state.form1IsValid}>Create!</FormBtn>}
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
    // resetFileHandler: () => dispatch({ type: actionTypes.RESET_FILE_HANDLER }),
    setErrorHandler: (message) => dispatch(actionCreators.setErrorHandler(message)),
    toggleErrorModalHandler: () => dispatch(actionCreators.toggleErrorModalHandler()),
    createProduct: (body, headers, resetForm, resetFile) => dispatch(actionCreators.createProduct(body, headers, resetForm, resetFile))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountInfo);