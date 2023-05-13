import React, { useState } from 'react'
import {Formik,Field,Form} from 'formik';
import './pages.css'
import { userRegisterSchema } from '../Validation/validation';
import { Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

function Register() {
    let navigate = useNavigate();
    const [alert,setAlert] = useState(false);
    axios.get(`${process.env.REACT_APP_API_URL}/session/`,{
        headers: {
          'Authorization': `Basic ${Cookies.get('token')}`
        }})
    .then(function (response) {
      navigate('/');
    })
    .catch(function (error) {
    });
  return (
    <div className='auth-container'>
        {alert && <Alert className='alert' key = 'danger' variant = 'danger'>
            Kayıt işlemi yapılamadı
        </Alert>}
        <h3 className='title'>Expert To-Do</h3>
        <span style={{fontSize:"24px",fontWeight:"400"}}>Register</span>
        <Formik initialValues={{
            name: '',
            surname: '',
            email:'',
            password: '',
        }}
        validationSchema={userRegisterSchema}
        onSubmit={(values) => {
            axios.post(`${process.env.REACT_APP_API_URL}/register/`,values)
              .then(function (response) {
                Cookies.set('token',response.data.token);
                navigate('/login');
              })
              .catch(function (error) {
                setAlert(true);
                setTimeout(() => {setAlert(false)},3000);
              });
        }}
        >
            {({errors,touched}) => (
                <Form className='authForm'>
                    <div>
                        <label style={{fontSize:'14px'}} htmlFor='name'>Name</label><br></br>
                        <Field className='authInput' type='text' id='name' name = 'name'/>
                        {errors.name && touched.name ? (
                            <div className='text-danger sm'><small>{errors.name}</small></div>
                        ):null}
                    </div>
                    <div>
                        <label style={{fontSize:'14px'}} htmlFor='surname'>Surname</label><br></br>
                        <Field className='authInput' type='text' id='surname' name = 'surname'/>
                        {errors.surname && touched.surname ? (
                            <div className='text-danger sm'><small>{errors.surname}</small></div>
                        ):null}
                    </div>

                    <div>
                        <label style={{fontSize:'14px'}} htmlFor='email'>Email</label><br></br>
                        <Field className='authInput' type='email' id='email' name = 'email'/>
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

                    <button className='btn btn-primary' type="submit">Submit</button>
                </Form>
            )}
        </Formik>
        <span style={{marginTop:'20px'}}>Do Have an Account? <Link to='/login' className='other-auth'>Login</Link></span>
    </div>
  )
}

export default Register