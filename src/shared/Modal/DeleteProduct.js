import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './GlobalModal.css';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import { FormBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';

class DeleteProduct extends Component {

  static contextType = ProductsContext;
  state = {
    isLoading: false,
  }

  deleteProductHandler = async (event) => {
    event.preventDefault();

    try {
      this.setState(() => {
        return { isLoading: true }
      })
      await fetch(`http://localhost:5000/api/products/${this.context.productForUpdating.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token,
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
      });

      this.context.closeModalHandler();
      // using errorModal to send a message, not actually an error
      this.context.setErrorHandler('Successfully deleted item');
      this.context.toggleErrorModalHandler();
      const { history } = this.props;
      history.replace('/');
      history.replace('/account');

    } catch (error) {
      this.context.setErrorHandler(error)
      this.context.toggleErrorModalHandler();
    }
    this.setState(() => {
      return { isLoading: false }
    })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.deleteProductHandler} >
          <Title title={`Delete ${this.context.productForUpdating.title}?`} />
          {this.state.isLoading ? <Spinner /> : <FormBtn className='clearBtn' id='danger' type='submit' >Delete Item</FormBtn>}
          <Title title={`This change is permanent and cannot be undone. Continue?`} />
        </form>
      </React.Fragment >
    )
  }
}

export default withRouter(DeleteProduct);