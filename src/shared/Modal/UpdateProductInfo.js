import React, { useContext } from 'react';

import './GlobalModal.css';
import Input from '../Input/Input';
import { ReturnBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';

export default function UpdateProductInfo() {
  // const context = useContext(ProductsContext);

  return (
    <React.Fragment>
      <form>
        <div>update Name.....</div>
        <Input />
        <div>Price</div>
        <Input />
        <div>Image</div>
        <Input />
        <div>Description</div>
        <Input />
        <div>Company</div>
        <Input />
        <div>Inventory</div>
        <Input />
        <ReturnBtn type='submit'>Submit Changes</ReturnBtn>
      </form>
    </React.Fragment>
  )
}
