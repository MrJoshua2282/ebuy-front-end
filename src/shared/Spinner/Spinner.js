import React from 'react';

import './Spinner.css';

export default function Spinner(props) {
  return (
    <div className='spinner-div'>
      <div style={props.style} className="loader">Loading...</div>
    </div>
  )
}
