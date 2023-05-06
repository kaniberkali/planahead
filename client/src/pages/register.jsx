import React from 'react'
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import './pages.css'

function register() {
    const registerUser = Yup.object().shape({
        username:Yup.string().required('Bu alan zorunludur').matches(/^[aA-zZ\s]+$/, "Yanlızca alfabetik karakter kullanılabilir."),
        password:Yup.string().required('Bu alan zorunludur').min(8, 'Şifre en az 8 karakterli olabilir.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        email:Yup.string().email().required('Bu alan zorunludur'),
    })
  return (
    <div className='auth-container'>
        <h3 className='title'>Expert To-Do</h3>
        <span style={{fontSize:"24px",fontWeight:"400"}}>Register</span>
        <Formik initialValues={{
            username: '',
            password: '',
            email: '',
        }}
        validationSchema={registerUser}
        onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r,500));
            alert(JSON.stringify(values,null,2));
        }}
        >
            {({errors,touched}) => (
                <Form className='authForm'>
                    <div>
                        <label style={{fontSize:'14px'}} htmlFor='username'>Username</label><br></br>
                        <Field className='authInput' type='text' id='username' name = 'username'/>
                        {errors.username && touched.username ? (
                            <div className='text-danger sm'><small>{errors.username}</small></div>
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
        <span style={{marginTop:'20px'}}>Do Have an Account? <a href='#' className='other-auth'>Login</a></span>
    </div>
  )
}

export default register