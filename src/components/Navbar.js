import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';
import phone from '../images/phone.svg';
import Cart from '../images/cart.js';

export default class Navbar extends Component {
    state = {
        num: 1
    }
    render() {
        return (
            <nav className='navbar-div'>
                <Link to='/'><img className='navbar-img-phone' src={phone} alt='phone' /></Link>
                <Link to='/' className='navbar-img-products'>Products</Link>
                <Link className='navbar-img-cart-link' to='/cart'><button className='navbar-img-cart-link-btn'>
                    <Cart className='navbar-img-cart svgCart' />
                    my cart</button></Link>
            </nav>
        )
    }
}