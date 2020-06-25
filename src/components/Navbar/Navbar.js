import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

import './Navbar.css';
import CartIcon from '../../images/cart';
import { ProductsContext } from '../../context';

class Navbar extends Component {
  static contextType = ProductsContext;
  componentDidUpdate() {
    // console.log(this.context.userInfo.user.id)
    // console.log(this.props, 'this is props')
    console.log(this.context.name)
  }

  charConverter = (firstName) => {
    if (!firstName) return '';
    let firstInitial = firstName.split('')[0];
    return firstInitial;
  }

  render() {
    // let { firstName } = this.context.userInfo;
    let login = (
      <React.Fragment>
        <span id='e'>l</span>
        <span id='b'>o</span>
        <span id='u'>g</span>
        <span id='y'>o</span>
        <span id='e'>u</span>
        <span id='b'>t</span>
      </React.Fragment>
    );

    let signuplogin = (
      <React.Fragment>
        <span id='e'>l</span>
        <span id='b'>o</span>
        <span id='u'>g</span>
        <span id='y'>i</span>
        <span id='e'>n</span>
        <span id='b'>/</span>
        <span id='u'>s</span>
        <span id='y'>i</span>
        <span id='e'>g</span>
        <span id='b'>n</span>
        <span id='u'>u</span>
        <span id='y'>p</span>
      </React.Fragment>
    )
    return (
      <nav className='navbar-div'>
        <Link to='/' className='link-ebuy'>
          <span id='e'>e</span>
          <span id='b'>b</span>
          <span id='u'>u</span>
          <span id='y'>y</span>
        </Link>
        <section className='navbar-middle-section'>
          <Link className='navbar-img-cart-link' to='/cart'><button className='navbar-img-cart-link-btn'>
            <CartIcon className='navbar-img-cart svgCart' />
                    my cart</button></Link>
          {this.context.signedIn && <Link to='/account' className='user-first-initial'>{this.charConverter(this.context.name)}</Link>}
        </section>

        {this.context.signedIn ? <div onClick={() => {
          this.context.toggleSignedInHandler();
          this.props.history.push('/');
        }} className='link-ebuy'>
          {login}
        </div> : <Link to='/signuplogin' className='link-ebuy'>{signuplogin}</Link>}
      </nav>
    )
  }
}

export default withRouter(Navbar);