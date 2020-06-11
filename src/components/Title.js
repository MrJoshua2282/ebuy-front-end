import React from 'react'

import './Title.css';

import './Title.css';

export default function Title(props) {
    return (
        <div className='title-div'>
            {props.name} <strong>{props.title}</strong>
        </div>
    )
}
