import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './SignUpLogin.css';
import Title from '../../shared/Title/Title';
import Input from '../../shared/Input/Input';
import Spinner from '../../shared/Spinner/Spinner';
import { ProductsContext } from '../../context';
import { FormBtn } from '../../shared/Btn/Btns';

const SignUpLogin = (props) => {
  const history = useHistory();
  const context = useContext(ProductsContext);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  // const { isLoading, error, sendRequest } = useAsync();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [form1IsValid, setForm1IsValid] = useState(false);
  const [form2IsValid, setForm2IsValid] = useState(false);
  const [form1, setForm1] = useState([
    // First Name
    {
      id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: {
        type: 'text', placeholder: 'first name'
      }, value: '', pattern: '(?=.*[a-zA-Z]).{1,}'
    },

    // Last Name
    { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'last name' }, value: '', pattern: '(?=.*[a-zA-Z]).{1,}' },

    // Email
    { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'email', placeholder: 'email' }, value: '', pattern: ".{1,}" },

    // Password
    { id: 'a password containing at least 8 characters', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'password' }, value: '', pattern: ".{8,}" },
  ],
  )

  const [form2, setForm2] = useState([
    // Email
    { id: '', valid: true, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'email', placeholder: 'email' }, value: '', pattern: ".{1,}" },

    // Password
    { id: '', valid: false, validation: { required: true, touched: false }, elType: 'input', attributes: { type: 'text', placeholder: 'password' }, value: '', pattern: ".{1,}" },
  ]
  )

  const inputChangeHandler = (event, itemId, form) => {
    const { copyForm, formIsValid } = context.validationHandler(event, itemId, form)

    if (form === form1) {
      setForm1(copyForm)
      setForm1IsValid(formIsValid);

    } else if (form === form2) {
      setForm2(copyForm)
      setForm2IsValid(formIsValid);
    }
  }

  const loginHandler = async (event) => {
    event.preventDefault();

    let response;
    try {
      setIsLoadingLogin(true)
      response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // JSON.stringify() takes js objects/arrays and converts them to json
          body: JSON.stringify({
            email: form2[0].value,
            password: form2[1].value,
          })
        }
      )
      const responseData = await response.json();
      // if response has a 400ish/500ish response code, then handle that error
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      let copyForm = [...form2];
      copyForm.map(el => {
        el.value = '';
        el.valid = false;
        el.touched = false;
        return el;
      });
      setForm2(copyForm);
      context.toggleSignedInHandler(responseData);
      setTimeout(() => {
        history.push('/');
      }, 250);

    } catch (error) {
      context.setErrorHandler(error || 'Something went wrong, please try again');
      context.toggleErrorModalHandler();
    }
    setIsLoadingLogin(false)
  }

  const signupHandler = async (event) => {
    event.preventDefault();

    let response;
    try {
      setIsLoadingSignup(true);
      response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // JSON.stringify() takes js objects/arrays and converts them to json
          body: JSON.stringify({
            firstName: form1[0].value,
            lastName: form1[1].value,
            email: form1[2].value,
            password: form1[3].value,
          })
        }
      )
      const responseData = await response.json();
      // if response has a 400ish/500ish response code, then handle that error
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      let copyForm = [...form1];
      copyForm.map(el => {
        el.value = '';
        el.valid = false;
        el.touched = false;
        return el;
      });
      setForm1(copyForm);
      context.toggleSignedInHandler(responseData)
      setTimeout(() => {
        history.push('/');
      }, 250);

    } catch (error) {
      context.setErrorHandler(error || 'Something went wrong, please try again');
      context.toggleErrorModalHandler();
    }
    setIsLoadingSignup(false);
  }

  let form1El = form1.map((el, i) => {
    return <Input
      key={i}
      elType={el.elType}
      value={el.value}
      attributes={el.attributes}
      onChange={(event) => inputChangeHandler(event, i, form1)}
      valid={el.valid}
      shouldValidate={el.validation}
      touched={el.touched}
      valueType={el.id}
    />
  });

  let form2El = form2.map((el, i) => {
    return <Input
      key={i}
      elType={el.elType}
      value={el.value}
      attributes={el.attributes}
      onChange={(event) => inputChangeHandler(event, i, form2)}
      valid={el.valid}
      shouldValidate={el.validation}
      touched={el.touched}
      valueType={el.id}
    />
  });

  return (
    <section className='section-form'>
      <form className='form-body' onSubmit={loginHandler}>
        <Title title='Login' className='small-padding' />
        {form2El}
        <div className='signupLogin-div-btn'>
          {isLoadingLogin ? <Spinner /> : <FormBtn type='submit' disabled={!form2IsValid}>Welcome Back!</FormBtn>}
        </div>
      </form>

      <form className='form-body' onSubmit={signupHandler}>
        <Title title='Signup' className='small-padding' />
        {form1El}
        <div className='signupLogin-div-btn'>
          {isLoadingSignup ? <Spinner /> : <FormBtn type='submit' disabled={!form1IsValid}>Join the crew!</FormBtn>}
        </div>
      </form>
    </section>
  );
};
export default SignUpLogin;
