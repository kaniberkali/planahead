import React from 'react'
import {Formik,Field,Form} from 'formik';
import './pages.css'

function register() {
  return (
    <div className='auth-container'>
        <h3 className='title'>Expert To-Do</h3>
        <span style={{fontSize:"24px",fontWeight:"400"}}>Register</span>
        <Formik initialValues={{
            username: '',
            password: '',
            email: '',
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
                    <label style={{fontSize:'14px'}} htmlFor='email'>Email</label><br></br>
                    <Field className='authInput' type='email' id='email' name = 'email'/>
                </div>

                <div>
                    <label style={{fontSize:'14px'}} htmlFor='password'>Password</label><br></br>
                    <Field className='authInput' type='password' id='password' name = 'password'/>
                </div>

                <button className='btn btn-primary' type="submit">Submit</button>
            </Form>

        </Formik>
        <span style={{marginTop:'20px'}}>Do Have an Account? <a href='#' className='other-auth'>Login</a></span>
    </div>
  )
}

export default register