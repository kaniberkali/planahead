const express = require('express');
import * as Yup from 'yup';

const userLoginScheme = Yup.object().shape({
    username:Yup.string().required('Bu alan zorunludur').matches(/^[aA-zZ\s]+$/, "Yanlızca alfabetik karakter kullanılabilir."),
    password:Yup.string().required('Bu alan zorunludur').min(8, 'Şifre en az 8 karakterli olabilir.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    email:Yup.string().email().required('Bu alan zorunludur'),
})

module.exports = { userLoginScheme }