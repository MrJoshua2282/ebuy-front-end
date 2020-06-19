import React, { useContext } from 'react';

import Title from '../Title/Title';
import { ProductsContext } from '../../context';

export default function ErrorModal() {
  const context = useContext(ProductsContext);
  return (
    <React.Fragment>
      {context.showErrorModal && <div className='modal-background'
      // onClick={
      //   () => context.toggleErrorModalHandler()}
      >&#32;</div>}
      {context.showErrorModal &&
        < div className='modal-card' >
          <Title title={`${context.error}`} />
        </div >}
    </React.Fragment>

  )
}
