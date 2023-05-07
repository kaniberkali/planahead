import React from 'react'
import {Formik,Field,Form} from 'formik';
import { userLoginSchema } from '../Validation/validation';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './pages.css'

function Login() {
    let navigate = useNavigate();
    axios.get(`${process.env.REACT_APP_API_URL}/session/`,{
        headers: {
          'Authorization': `Basic ${Cookies.get('token')}`
        }})
    .then(function (response) {
      navigate('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <div className='auth-container'>
        <h3 className='title'>Expert To-Do</h3>
        <span style={{fontSize:"24px",fontWeight:"400"}}>Login</span>
        <Formik initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={userLoginSchema}
        onSubmit={(values) => {
            axios.post(`${process.env.REACT_APP_API_URL}/login/`,values)
              .then(function (response) {
                console.log(response);
                Cookies.set('token',response.data.token);
                navigate('/');
              })
              .catch(function (error) {
                console.log(error);
              });
        }}
        >
            {({errors,touched}) => (
                <Form className='authForm'>
                    <div>
                        <label style={{fontSize:'14px'}} htmlFor='email'>Email</label><br></br>
                        <Field className='authInput' type='text' id='email' name = 'email'/>
                        {errors.email && touched.email ? (
                            <div className='text-danger sm'><small>{errors.email}</small></div>
                        ):null}
                    </div>

                    <div>
                        <label style={{fontSize:'14px'}} htmlFor='password'>Password</label><br></br>
                        <Field className='authInput' type='password' id='password' name = 'password'/>
                        {errors.password && touched.password ? (
                            <div className='text-danger sm'><small>{errors.password}</small></div>
                        ):null}
                    </div>

                    <button className='btn btn-primary' type="submit">Sign In</button>
                </Form>
            )}

        </Formik>
        <span style={{marginTop:'30px'}}>Don't Have an Account? <Link to={'/register'} className='other-auth'>Register</Link></span>
    </div>
  )
}

export default Login