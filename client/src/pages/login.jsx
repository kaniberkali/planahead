import React from 'react'
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import './pages.css'

function login() {
  return (
    <div className='auth-container'>
        <h3 className='title'>Expert To-Do</h3>
        <span style={{fontSize:"24px",fontWeight:"400"}}>Login</span>
        <Formik initialValues={{
            username: '',
            password: '',
        }}
        onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r,500));
            alert(JSON.stringify(values,null,2));
        }}
        >
            <Form className='authForm'>
                <div>
                    <label style={{fontSize:'14px'}} htmlFor='username'>Username</label><br></br>
                    <Field className='authInput' type='text' id='username' name = 'username'/>
                </div>

                <div>
                    <label style={{fontSize:'14px'}} htmlFor='password'>Password</label><br></br>
                    <Field className='authInput' type='password' id='password' name = 'password'/>
                </div>

                <button className='btn btn-primary' type="submit">Sign In</button>
            </Form>

        </Formik>
        <span style={{marginTop:'30px'}}>Don't Have an Account? <a href='#' className='other-auth'>Register</a></span>
    </div>
  )
}

export default login