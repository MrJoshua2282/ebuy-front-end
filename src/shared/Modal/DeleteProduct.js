import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './GlobalModal.css';
import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';
import * as actionCreators from '../../store/actionCreators';
import { FormBtn } from '../Btn/Btns';

class DeleteProduct extends Component {

  state = {
    isLoading: false,
  }

  deleteProductHandler = (event) => {
    event.preventDefault();

    this.props.deleteProduct(this.props.token, this.props.productForUpdating.id);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.deleteProductHandler} >
          <Title title={`Delete ${this.props.productForUpdating.title}?`} />
          {this.state.isLoading ? <Spinner /> : <FormBtn className='clearBtn' id='danger' type='submit' >Delete Item</FormBtn>}
          <Title title={`This change is permanent. Continue?`} />
        </form>
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    productForUpdating: state.productForUpdating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleErrorModalHandler: () => dispatch(actionCreators.toggleErrorModalHandler()),
    setErrorHandler: (message) => dispatch(actionCreators.setErrorHandler()),
    closeModalHandler: () => dispatch(actionCreators.closeModalHandler()),
    deleteProduct: (token, productForUpdatingId) => dispatch(actionCreators.deleteProduct(token, productForUpdatingId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteProduct));