import React from 'react'

import './Title.css';
// import { ProductsContext } from '../context';

export default function Title(props) {
  // const context = useContext(ProductsContext)
  return (
    <div className={`title-div ${props.className}`}>
      {props.name} <strong>{props.title}</strong>
    </div>
  )
}
