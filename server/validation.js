const express = require('express');
import * as yup from 'yup';

const userLoginScheme = yup.object().shape({
    name: yup.string().min(1).required()
})