import React, { Component } from 'react';

import './Default.css';

export default class Default extends Component {
  render() {
    return (
      <div className='errorPage'>
        <h1>404</h1>
        <h1>ERROR</h1>
        <h2>Page not found</h2>
        <h2>The requested url <span className='danger'>{this.props.location.pathname}</span> was not found</h2>
      </div>
    )
  }
}
