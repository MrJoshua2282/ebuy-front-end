import React from 'react';

import './AccProdItem.css';

export default function AccProdItem() {
  return (
    <form>
      <img src="" alt="product" className="account-product-img" />
      <span className="account-title">Title</span>
      {/* <input onChange={} value={} placeholder='company name' /> */}
      <span className="account-price">
        <button>-</button>
        <button>$ price</button>
        <button>+</button>
      </span>
      <span className="account-company">Company</span>
      {/* <input onChange={} value={} placeholder='company name' /> */}
      <span className="account-inventory">
        <button>-</button>
        <button>inventory number</button>
        <button>+</button>
      </span>
      <button>Submit Changes</button>
    </form>
  )
}
