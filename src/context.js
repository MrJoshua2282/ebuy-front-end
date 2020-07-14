import React, { Component } from 'react';

const ProductsContext = React.createContext();

class ProductsProvider extends Component {
  state = {
    file: '',
    previewUrl: '',
  }

  validationHandler = (event, itemId, form) => {
    /* Validation */
    const checkValidity = (value, validation, pattern) => {
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

    /* FileReader */
    const fileReaderHandler = (file) => {
      this.setState({ file: file });

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.setState({ previewUrl: fileReader.result })
      };
      fileReader.readAsDataURL(file);
    }

    /* Validation */
    const { value } = event.target;

    let copyForm = [...form];

    copyForm = copyForm.map((el, i) => {
      if (i === itemId) {
        if (el.attributes.type === 'file') {
          fileReaderHandler(event.target.files[0]);
        }

        el.value = value;
        el.valid = checkValidity(el.value, el.validation, el.pattern);
        el.touched = true;
      }
      return el;
    });

    let formIsValid = true;
    formIsValid = form.every(el => el.valid && formIsValid);

    return { copyForm, formIsValid };
  }

  resetFileHandler = () => {
    this.setState(() => {
      return { file: '', previewUrl: '' }
    })
  }

  render() {
    return (
      <ProductsContext.Provider value={{
        ...this.state,
        validationHandler: this.validationHandler,
        resetFileHandler: this.resetFileHandler,
      }}>
        {this.props.children}
      </ProductsContext.Provider>
    )
  }
}

const ProductsConsumer = ProductsContext.Consumer;

export { ProductsProvider, ProductsConsumer, ProductsContext };