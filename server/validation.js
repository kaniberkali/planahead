const Yup = require('yup');

const userRegisterSchema = Yup.object().shape({
    name:Yup.string().required('Bu alan zorunludur'),
    surname:Yup.string().required('Bu alan zorunludur'),
    password:Yup.string().required('Bu alan zorunludur').min(5, 'Şifre en az 5 karakterli olabilir.'),
    email:Yup.string().email('Lütfen bir email adresi girin...').required('Bu alan zorunludur')
});

const userLoginSchema = Yup.object().shape({
    email:Yup.string().email('Lütfen bir email adresi girin...').required('Bu alan zorunludur'),
    password:Yup.string().required('Bu alan zorunludur').min(5, 'Şifre en az 5 karakterli olabilir.')
});

module.exports = {userRegisterSchema, userLoginSchema }