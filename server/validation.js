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

const noteSchema = Yup.object().shape({
    user_id:Yup.number().required(),
    type:Yup.string().required(),
    icon_id:Yup.number().required(),
    date:Yup.string().required(),
    title:Yup.string().required(),
    content:Yup.string(),
    create_date:Yup.string(),
    state:Yup.string()
})

module.exports = {userRegisterSchema, userLoginSchema, noteSchema }