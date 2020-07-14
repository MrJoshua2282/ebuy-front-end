import React, { Component } from 'react';
import { connect } from 'react-redux';

import Title from '../Title/Title';

class ErrorModal extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.showErrorModal && <div className='modal-background'
        >&#32;</div>}
        {this.props.showErrorModal &&
          < div className='modal-card' >
            <Title title={`${this.props.error}`} />
          </div >}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    showErrorModal: state.showErrorModal
  }
}

export default connect(mapStateToProps)(ErrorModal);
