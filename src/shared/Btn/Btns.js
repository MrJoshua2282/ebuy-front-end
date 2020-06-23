import React from 'react';

import './GlobalBtns.css';

export const ReturnBtn = (props) => <button id={props.id} className={`backBtn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const GoToCartBtn = (props) => <button id={props.id} className={`addBtn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const DangerClearBtn = (props) => <button id={props.id} className={`clearBtn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const TabBtn = (props) => <button id={props.id} className={`btn-tab ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>

export const FormBtn = (props) => <button id={props.id} className={`validation-btn ${props.className}`} onClick={props.onClick} style={props.style} disabled={props.disabled} type={props.type}>{props.children}</button>