import React from 'react';

import './AccProdItem.css';

export default function AccProdItem(props) {
  return (
    <form>
      <img src={props.image} alt="product" className="account-product-img" />
      <span className="account-title">{props.title}</span>
      <span className="account-price">
        <button>-</button>
        <button>$ {props.price}</button>
        <button>+</button>
      </span>
      <span className="account-company">{props.company}</span>
      <span className="account-inventory">
        <button>-</button>
        <button>{props.inventory}</button>
        <button>+</button>
      </span>
      <div>{props.description}</div>
      <button type='submit'>Submit Changes</button>
    </form>
  )
}