import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Details.css';
import Title from './Title';
import { ProductsConsumer } from '../context';

export default class Details extends Component {
    render() {
        return (
            <ProductsConsumer>
                {(value) => {
                    const { id, company, img, info, price, title, inCart } = value.detailProduct;
                    return (
                        <React.Fragment>
                            <Title title={title} />
                            <div className='details-container'>
                                <img src={img} alt='product' />
                                <div>
                                    <h2>{title}</h2>
                                    <h4 className='madeBy'>made by: {company}</h4>
                                    <strong>${price}</strong>
                                    <p>info</p>
                                    <p>{info}</p>

                                    <div>
                                        <Link to='/'>
                                            <button className='detail-backBtn'>Back To Products</button>
                                        </Link>
                                        <button onClick={() => {
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }} disabled={inCart ? true : false} className='detail-addBtn'>{inCart ? 'In Cart' : 'Add To Cart'} </button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}
            </ProductsConsumer>
        )
    }
}
