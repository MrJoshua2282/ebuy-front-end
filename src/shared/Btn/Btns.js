import React from 'react';

import './GlobalBtns.css';

export const ReturnBtn = (props) => <button className={`backBtn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const GoToCartBtn = (props) => <button className={`addBtn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const DangerClearBtn = (props) => <button className={`clearBtn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const TabBtn = (props) => <button className={`btn-tab ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const FormBtn = (props) => <button className={`validation-btn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>